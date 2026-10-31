import { db } from "../drizzle/client";
import { eq } from "drizzle-orm";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface SubscribeToEventParams {
    name: string,
    email: string,
    referrerId?: string | null 
}

export async function subscribeToEvent({ name, email, referrerId }: SubscribeToEventParams) {

    const subsribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email));

    if (subsribers.length > 0) {
        return {
            subscriberId: subsribers[0].id,
        }
    }

    const subscription = await db.insert(subscriptions).values({
        name,
        email
    }).returning();

    
    if(referrerId) {
        await redis.zincrby("referrals:ranking", 1, referrerId);
    }

    const subscriber = subscription[0];

    return {
        subscriberId: subscriber.id,
    }
}
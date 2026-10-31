import { inArray } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";


export async function Ranking() {


    const ranking = await redis.zrevrange("referrals:ranking",0,2, 'WITHSCORES');

    
    const subscriberIdAndScore: Record<string, number> = {};

    for (let i = 0; i < ranking.length; i += 2) {
        subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1]);
        
    }

    const subscribers = await db.select().from(subscriptions).where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)));

    
    const rankingWithScore = subscribers.map(subscriber => {
            return {
                id: subscriber.id,
                name: subscriber.name,
                score: subscriberIdAndScore[subscriber.id] || 0
        }
    }).sort((a, b) => b.score - a.score);


    return {
        rankingWithScore
    }
}
   
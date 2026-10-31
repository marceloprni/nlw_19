import { redis } from "../redis/client";

interface SubscriberInviteClickParams {
    subId: string,
}


export async function SubscriberInviteClick({ subId }: SubscriberInviteClickParams) {
    const count = await redis.hget("referrals:access-count", subId);
    
    return  {
        count: count ? parseInt(count) : 0,
    };
}
import { redis } from "../redis/client";

interface SubscriberRankingPositionParams {
    subId: string,
}


export async function SubscriberRankingPosition({ subId }: SubscriberRankingPositionParams) {

    const rank = await redis.zrevrank("referrals:ranking", subId);

    if(rank == null) {
        return {
            position: null,
        };
    }
    
    return  {
        position: rank + 1,
    };
}
import { redis } from "../redis/client";

interface SubscriberInviteClickCountParams {
    subId: string,
}


export async function SubscriberInviteClickCount({ subId }: SubscriberInviteClickCountParams) {


    const count = await redis.zscore("referrals:ranking", subId);

    console.log(count)

    return { 
        count: count ? parseInt(count) : 0 
    };

}
   
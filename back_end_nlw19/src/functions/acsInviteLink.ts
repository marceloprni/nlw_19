import { redis } from "../redis/client";

interface AcessInviteLinkParams {
    subId: string,
}


export async function acsInviteLink({ subId }: AcessInviteLinkParams) {
    await redis.hincrby("referrals:access-count", subId, 1);

}
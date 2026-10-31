import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../variable/env";
import { acsInviteLink } from "../functions/acsInviteLink";
import { redis } from "../redis/client";

export const acessInviteLink: FastifyPluginAsyncZod = async (app) => {
    
app.get('/invites/:subId', {
    schema: {
        summary: "Access invite link",
        tags: ["Invites"],
        params: z.object({
            subId: z.string()
        }),
        response: {
            201: z.object({            // ✅ nested no status code
              subId: z.string(),
        }),
      },
    }
}, async (request, reply) => {
    const { subId } = request.params;

    //console.log(`Accessing invite link for subscriber ID: ${subId}`);

    await acsInviteLink({ subId: subId });

    //console.log(await redis.hgetall("referrals:access-count"));

    const redirectUrl = new URL(env.WEB_URL);
    
    redirectUrl.searchParams.set("referrer", subId);

    // 301 - Permanent Redirect
    // 302 - Temporary Redirect

    return reply.redirect(redirectUrl.toString(), 302);
})

}
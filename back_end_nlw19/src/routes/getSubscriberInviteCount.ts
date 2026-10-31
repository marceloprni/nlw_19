import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { SubscriberInviteClickCount } from "../functions/SubcriberInviteCount";



export const getSubscriberInviteCount: FastifyPluginAsyncZod = async (app) => {
    
app.get('/subscribers/:subId/ranking/count', {
    schema: {
        summary: "Get subscriber invite count",
        tags: ["Invites"],
        params: z.object({
            subId: z.string()
        }),
        response: {
            302: z.object({            // ✅ nested no status code
              count: z.number(),
        }),
      },
    }
}, async (request, reply) => {
    const { subId } = request.params;

    console.log(`Getting invite count for subscriber ID: ${subId}`);

    const { count } = await SubscriberInviteClickCount({ subId: subId });

    return  { count: count };
})

}
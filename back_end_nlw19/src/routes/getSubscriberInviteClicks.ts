import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { SubscriberInviteClick } from "../functions/SubscriberInviteClick";


export const getSubscriberInviteClicks: FastifyPluginAsyncZod = async (app) => {
    
app.get('/subscribers/:subId/ranking/clicks', {
    schema: {
        summary: "Get subscriber invite clicks",
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
    const { count } = await SubscriberInviteClick({ subId: subId });

    return  { count: count };
})

}
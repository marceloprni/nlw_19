import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { SubscriberRankingPosition } from "../functions/SubscriberRankingPosition";


export const getSubscriberRankingPosition: FastifyPluginAsyncZod = async (app) => {
    
app.get('/subscribers/:subId/ranking/position', {
    schema: {
        summary: "Get subscriber ranking position",
        tags: ["Invites"],
        params: z.object({
            subId: z.string()
        }),
        response: {
            200: z.object({            // ✅ nested no status code
              position: z.number().nullable(),
        }),
      },
    }
}, async (request, reply) => {
    const { subId } = request.params;

    const { position } = await SubscriberRankingPosition({ subId: subId });

    return  { position: position };
})

}
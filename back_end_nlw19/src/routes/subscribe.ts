import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../functions/subscribeToEvent";

export const subscribeRoute: FastifyPluginAsyncZod = async (app) => {
    
app.post('/subscriptions', {
    schema: {
        summary: "Subscribe to the event",
        tags: ["Subscriptions"],
        body: z.object({
            name: z.string(),
            email: z.string().email(),
            referrerId: z.string().nullish()
        }),
        response: {
            201: z.object({            // ✅ nested no status code
              subscriberId: z.string(),
            }),
      },
    }
}, async (request, reply) => {
    const { name, email, referrerId } = request.body;

   
    const {subscriberId } = await subscribeToEvent({ name, email, referrerId });



    return reply.status(201).send({ subscriberId });
})

}
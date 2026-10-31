import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { answerUserMessage } from "../functions/answerUserMessage";

export const sendMessage: FastifyPluginAsyncZod = async (app) => {
    
app.post('/messages', {
    schema: {
        summary: "Send a message to the AI chat",
        tags: ["ai"],
        body: z.object({
            message: z.string(),
        }),
        response: {
            200: z.object({            // ✅ nested no status code
              response: z.string(),
        }),
      },
    }
}, async (request, reply) => {
    const { message } = request.body;

    const { messages } = await answerUserMessage({ messages: message })

    return reply.status(200).send({ response: messages });
})

}
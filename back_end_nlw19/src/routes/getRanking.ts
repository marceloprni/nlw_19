import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { Ranking } from "../functions/ranking";
import z from "zod";



export const getRanking: FastifyPluginAsyncZod = async (app) => {
    
app.get('/ranking', {
    schema: {
        summary: "Get subscriber invite count",
        tags: ["Invites"],
        //params: z.object({
        //    subId: z.string()
        //}),
        response: {
            200: z.object({            // ✅ nested no status code
              ranking: z.array(
                z.object({
                    id: z.string(),
                    name: z.string(),
                    score: z.number()
                })
              ),
        }),
      },
    }
}, async (request, reply) => {

    const { rankingWithScore } = await Ranking();

    

    return  { ranking: rankingWithScore };
})


}
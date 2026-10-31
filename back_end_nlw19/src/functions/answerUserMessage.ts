import { generateText, stepCountIs, tool } from "ai";
import { openai } from "../ai/openAi";
import { postgresTool } from "../tools/postgresTool";
import { redisTool } from "../tools/redisTool";


interface AnswerUserMessageParams {
    messages: string,
}


export async function answerUserMessage({ messages }: AnswerUserMessageParams) {

    const anwser = await generateText({
        model: openai, 
        prompt: messages,
        tools: {
            postgres: postgresTool,
            redis: redisTool,
        },
        system: `Você é um assistente do evento de programação.
        Responda sempre em português.
        Regras de formatação:
        - Nunca use frases de introdução ou conclusão (ex: NÃO diga "Aqui estão os e-mails:").
        - Seja direto ao ponto.
        - Quando listar itens, use formatação clara em Markdown (bullet points ou tabela).`.trim(),
                stopWhen: stepCountIs(5),
        })
        
   return { messages: anwser.text}

}
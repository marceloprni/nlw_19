import { tool } from "ai"
import { pg } from "../drizzle/client"
import z from "zod"



export const postgresTool = tool({
                description: `Realiza uma query no postgres para buscar informações sobre as tabelas no banco de dados.
                Só pode realizar operações de busca select não e permitido qualquer operação de escrita
                Tables:
                """
                    CREATE TABLE subscriptions (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
                    );
                """

                Todas operações devem retornar um máxima de 50 itens
                `.trim(),
                inputSchema: z.object({
                    query: z.string().describe('A query do PostresSQL para ser eexecutada'),
                    params: z.array(z.string()).describe('Parâmetros da query a ser executada.')
                }),
                execute: async ({query, params}) => {
                    const result = await pg.unsafe(query, params)
                    return JSON.stringify(result)
                }
})

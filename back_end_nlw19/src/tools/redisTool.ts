import { tool } from "ai"
import z from "zod"
import { redis } from "../redis/client"



export const redisTool = tool({
                description: `
                Realiza um comando no Redis para buscar informações sobre o sistema de indicação
                como o numero de cliques no link, numero de indicações de convite realizados
                e ranking de indicações:

                Só pode ser utilizado para busca dados do Redis, não pode executar nenhum comando de escrita

                Você pode buscar dados de:

                - um hash chamado "referrals:access-count" que guarda o numero do cliques/acessos no link de convite/indicação de cada
                usuario no formato { "SUBSCRIBER_ID": NUMERO_DE_CLIQUES} onde  o subscriber_id vem do postgres.

                - Um zset chamado "referrals:ranking" que guarda o total de convites/indicações feitos por cada usuario onde o score e a quantidade
                de convites e o conteudo e o SUBSCRIBER_ID que vem do postgres.
                `.trim(),
                inputSchema: z.object({
                    command: z.string().describe('O  comando a ser executado no redis como GET, HGET, ZREVRANGE.'),
                    args: z.array(z.string()).describe('Argumentos que vem logo apos o comando do Redis.')
                }),
                execute: async ({command, args}) => {
                    const result = await redis.call(command, args)
                    return JSON.stringify(result)
                }
})

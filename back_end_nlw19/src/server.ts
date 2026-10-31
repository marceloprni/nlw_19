import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import { jsonSchemaTransform, serializerCompiler, 
        validatorCompiler, 
        ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";        
import { subscribeRoute } from "./routes/subscribe";
import { acessInviteLink } from "./routes/acessInviteLink";
import { env } from "./variable/env";

import { getSubscriberInviteCount } from "./routes/getSubscriberInviteCount";
import { getSubscriberRankingPosition } from "./routes/getSubscriberRankinPosition";
import { getSubscriberInviteClicks } from "./routes/getSubscriberInviteClicks";
import { getRanking } from "./routes/getRanking";
import { sendMessage } from "./routes/sendMessage";


const app = fastify()

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
    //origin: "http://localhost:3000",
    origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
})


app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})


app.register(subscribeRoute);
app.register(acessInviteLink);
app.register(getSubscriberInviteClicks);
app.register(getSubscriberInviteCount);
app.register(getSubscriberRankingPosition);
app.register(getRanking);
app.register(sendMessage);


app.listen({
    port: env.PORT,
}).then(() => {
    console.log(`HTTP server running on http://localhost:${env.PORT}`);
});
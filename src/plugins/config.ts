import z from 'zod';
import { SupportPluginOptions } from './support';
import fp from 'fastify-plugin'

const envSchema = z.object({
    PORT: z.number().default(3000),
    NODE_ENV: z
        .enum(['DEV', 'PROD'])
        .default('DEV'),
});

export type ConfigData = z.infer<typeof envSchema>

/**
 * This plugins adds some utilities to handle env configs
 *
 */
export default fp<SupportPluginOptions>(async (fastify) => {
    const envServer = envSchema.safeParse({
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
    });
    
    if (!envServer.success) {
        console.error(envServer.error.issues);
        throw new Error('There is an error with the server environment variables');
        process.exit(1);
    }
    fastify.decorate('configData', envServer.data)
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyInstance {
        configData: ConfigData;
    }
  }
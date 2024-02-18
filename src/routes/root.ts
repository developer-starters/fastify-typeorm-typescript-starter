import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    console.log(JSON.stringify(fastify.configData))
    return { root: true }
  })
}

export default root;

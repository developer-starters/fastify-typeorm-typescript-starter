import { FastifyPluginAsync } from "fastify"
import { SingUserRequestSchema } from "../../schemas/UserSchema";
import { FastifyRequest } from "fastify/types/request";
import z from "zod";

const DeletUserRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.delete('/:id', async function (request: FastifyRequest) {
    const parseResponse = SingUserRequestSchema.safeParse(request.params as z.infer<typeof SingUserRequestSchema>)
    if (parseResponse.success) {
        return true
    }
    console.error(parseResponse.error.issues)
    return false;
  })
}

export default DeletUserRoute;

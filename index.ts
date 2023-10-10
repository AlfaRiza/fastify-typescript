import fastify, { FastifyInstance } from 'fastify';

const app: FastifyInstance = fastify({
  logger: true
})

interface IQueryInterface {
  username: string
  password: string
}

interface IHeadersInterface {
  'x-access-token': string
}

interface IReplyInterface {
  code: number
  message: string
  body: any
}

app.get<{Querystring: IQueryInterface, Headers: IHeadersInterface, Reply: IReplyInterface}>('/', (req: any,reply: any) => {
  const { password, username } = req.query
  return reply.send({
    code: 200,
    message: 'success',
    body: {
      username,
      password,
    }
  })
})

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})

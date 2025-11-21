declare module "fastify" {
  interface FastifyContextConfig {
    checkAuth?: true;
    adminOnly?: true;
  }
}

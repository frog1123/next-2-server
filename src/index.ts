import { Url } from 'url';
const { ApolloServer, gql } = require('apollo-server');
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'path';

const schema = loadSchemaSync(join('src', './schemas/schema.gql'), { loaders: [new GraphQLFileLoader()] });
const resolvers = {
  Query: {
    hello: (_: any, { name }: { name: string }) => `Hello, ${name}`,
    post: (_: any, { id }: { id: string }) => `${id}`
  }
};

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

const server = new ApolloServer({ schema: schemaWithResolvers });

server.listen(9000).then(({ url }: { url: Url }) => console.log(`Server listening on ${url}`));

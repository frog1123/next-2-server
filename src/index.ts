import { Url } from 'url';
import { join } from 'path';

const { ApolloServer, gql } = require('apollo-server');
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { post } from './resolvers/post';
import { user } from './resolvers/user';

const schema = loadSchemaSync(join('src', './schemas/*.gql'), { loaders: [new GraphQLFileLoader()] });
const server = new ApolloServer({ typeDefs: schema, resolvers: [post, user] });

server.listen(9000).then(({ url }: { url: Url }) => console.log(`Server listening on ${url}`));

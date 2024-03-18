
import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer(){

    const gqpServer = new ApolloServer({
        typeDefs: ` 
        type Query {
          hello:String
      }
      type Mutation {
         ${User.mutations}
      }
    
    
        `, // schema
        resolvers: {
          Query: {
            ...User.resolvers.queries,
        },
        Mutation: {
            ...User.resolvers.mutations,
            
          },
        },
      });
    
      //stating server
      await gqpServer.start();

      return gqpServer;
}

export default createApolloGraphqlServer;
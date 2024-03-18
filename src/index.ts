import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

//import cors from 'cors';

async function init() {
  const app = express();

  //middlewares
  app.use(express.json());

  //creating  graphql  server
  const gqpServer = new ApolloServer({
    typeDefs: ` 
    type Query {
      hello :String 
      say(name:String):String
  }
  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
  }


    `, // schema
    resolvers: {
      Query: {
        hello: () => `Hello from graphql`,
        say: (_, { name }: { name: String }) => `hey ${name} , how are you?`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: "randam_salt",
            },
          });
          return true;
        },
      },
    },
  });

  //stating server
  await gqpServer.start();

  const PORT = Number(process.env.PORT) || 8000;

  
  app.get("/", (req, res) => {
    return res.json({ message: "server is up and running.." });
  });

  app.use("/graphql", expressMiddleware(gqpServer));

  app.listen(PORT, () => console.log(`server is strated at PORT:${PORT}`));
}
init();

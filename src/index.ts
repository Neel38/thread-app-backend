import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
//import cors from 'cors';

async function init() {
  const app = express();

  //creating  graphql  server
  const gqpServer = new ApolloServer({
    typeDefs: ` 
        type Query {
            hello :String 
            say(name:String):String
        }

    `,   // schema 
    resolvers: {
        Query:{
            hello : ()=>`Hello from graphql`,
            say :(_,{name} :{name: String})=>`hey ${name} , how are you?`,
            
        }
    },
  });

  //stating server
  await gqpServer.start();

  const PORT = Number(process.env.PORT) || 8000;
  

  //middlewares
  app.use(express.json())


  app.get("/", (req, res) => {
      return res.json({ message: "server is up and running.." });
    });

    app.use("/graphql",expressMiddleware(gqpServer));
    
  app.listen(PORT, () => console.log(`server is strated at PORT:${PORT}`));
}
init();

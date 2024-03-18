import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql"


async function init() {
  const app = express();

  //middlewares
  app.use(express.json());

 const PORT = Number(process.env.PORT) || 8000;

  
  app.get("/", (req, res) => {
    return res.json({ message: "server is up and running.." });
  });
  
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => console.log(`server is strated at PORT:${PORT}`));
}
init();

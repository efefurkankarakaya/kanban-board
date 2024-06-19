// import Board from "@/components/Board";
import Login from "@/components/Login";
import Kanban from "@/components/board/Kanban";
import { databaseURI } from "@/persistence/database";
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(databaseURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run()
  .then(() => {
    console.log("Kanban Board is connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error in MongoDB Connection:", error);
  });

export default function Home() {
  return (
    <main>
      <Login />
    </main>
  );
}

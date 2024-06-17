// import Board from "@/components/Board";
import Kanban from "@/components/board/Kanban";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env["DATABASE_URI"] as string;

// async function connect() {
//   const client = MongoClient.connect(uri);
//   const db = (await client).db();
//   const collection = db.collection("");
// }

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run()
//   .then(() => {
//     console.log("Kanban Board is connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("Error in MongoDB Connection:", error);
//   });

// https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
export default function Home() {
  return (
    <main>
      {/* <Board
        boardData={{
          "_id": "1",
          "_userName": "efk",
          "title": "Roadmap"
        }}
      /> */}
      <Kanban />
    </main>
  );
}

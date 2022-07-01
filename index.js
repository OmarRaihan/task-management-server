const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhltd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Main Function
async function run() {
  try {
    await client.connect();
    console.log("DB Connected");
    const tasksCollection = client.db("envy_task").collection("tasks");

    // Post API || Task
    app.post("/task", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });

    // PUT API || Task / Update Task
    app.put("/task/:id", async (req, res) => {
      const id = req.params.id;
      const updateTask = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          name: updateTask.name,
          description: updateTask.description,
        },
      };
      const result = await tasksCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });

    // Get API || Tasks
    app.get("/task", async (req, res) => {
      const query = {};
      const cursor = tasksCollection.find(query);
      const tasks = await cursor.toArray();
      res.send(tasks);
    });
  } finally {
  }
}

run().catch(console.dir);

// Root API
app.get("/", (req, res) => {
  res.send("Hello Envy Task");
});

app.listen(port, () => {
  console.log(`Envy Task listening on port ${port}`);
});

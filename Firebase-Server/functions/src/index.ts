import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { rootHandler, helloHandler } from "./handlers";
import {
  createTodoList,
  getTodoList,
  updateTodoItem,
  delTodoItem,
  updateTodoStatus,
} from "./todo";
import * as cors from "cors";

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body
main.use("/api/v1", app);
main.use(express.json());
main.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

//initialize the database and the collection
export const db = admin.firestore();
const userCollection = "users";

//define google cloud function name
export const webApi = functions.https.onRequest(main);

app.get("/", rootHandler);
app.get("/hello/:name", helloHandler);

app.get("/api/data", getTodoList);
app.post("/api/create", createTodoList);
app.post("/api/update", updateTodoItem);
app.post("/api/delete", delTodoItem);
app.post("/api/status", updateTodoStatus);

interface User {
  firstName: String;
  lastName: String;
}

// Create new user
app.get("/users", async (req, res) => {
  try {
    const user: User = {
      firstName: "firstName",
      lastName: "lastName",
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res
      .status(400)
      .send(
        `User should cointain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`
      );
  }
});

import { Request, Response } from "express";
import { db } from "./index";

interface Todo {
  task: string;
  done: boolean;
}

interface TodoItem {
  id: string;
  task: string;
  done: boolean;
}

interface TodoText {
  task: string;
}

interface TodoStatus {
  done: boolean;
}

type TodoItemBuilder = (id: string, task: string, done: boolean) => TodoItem;

const todoBuilder: TodoItemBuilder = (id, task, done) => ({
  id: id,
  task: task,
  done: done,
});

const todoItemCollection = "todo";

export const createTodoList = async (req: Request, res: Response) => {
  try {
    const todo: Todo = {
      task: req.body.task,
      done: req.body.done,
    };

    const newDoc = await db.collection(todoItemCollection).add(todo);
    res.status(201).json({ msg: `Created a new todo item: ${newDoc.id}` });
  } catch (error) {
    res
      .status(400)
      .json({ msg: `todo item should cointain task name and status!!!` });
  }
};

export const getTodoList = (req: Request, res: Response) => {
  const newState: any[] = [];
  const todoRef = db.collection(todoItemCollection);
  let response: TodoItem;
  todoRef
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        response = todoBuilder(doc.id, doc.data().task, doc.data().done);
        newState.push(response);
      });
      res.status(200).json({ data: newState });
    })
    .catch((err) => {
      res.json({ error: `Error getting documents: ${err}` });
    });
};

export const updateTodoItem = async (req: Request, res: Response) => {
  try {
    const todo: TodoText = {
      task: req.body.task,
    };

    await db.collection(todoItemCollection).doc(`${req.body.id}`).update(todo);
    res.status(201).json({ msg: `Update todo item successfully` });
  } catch (error) {
    res.status(400).json({ errmsg: `Update unsuccessfully ${error}` });
  }
};

export const delTodoItem = async (req: Request, res: Response) => {
  try {
    await db.collection(todoItemCollection).doc(`${req.body.id}`).delete();
    res.status(201).json({ msg: `Delete successfully` });
  } catch (error) {
    res.status(400).json({ errmsg: `Delete Error: ${error}` });
  }
};

export const updateTodoStatus = async (req: Request, res: Response) => {
  try {
    const todo: TodoStatus = {
      done: req.body.done,
    };

    await db.collection(todoItemCollection).doc(`${req.body.id}`).update(todo);
    res.status(201).json({ msg: `Update todo item successfully` });
  } catch (error) {
    res.status(400).json({ errmsg: `Update unsuccessfully ${error}` });
  }
};
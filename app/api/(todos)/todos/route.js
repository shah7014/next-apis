import { NextResponse } from "next/server";
import { pick } from "lodash";

import { Category, User, Todo } from "@/models/todos";
import { connectToDB } from "@/lib/mongoose";
import { getAsSuccessResponse } from "@/utils/responseHandler";

export const GET = async (request) => {
  try {
    await connectToDB();
    const todos = await Todo.find()
      .populate("category", "name")
      .populate("createdBy", "username");
    return NextResponse.json(getAsSuccessResponse("todos", todos), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (request) => {
  try {
    await connectToDB();
    const todoProposed = await request.json();
    const newTodo = await Todo.create(todoProposed);
    return NextResponse.json(
      getAsSuccessResponse(
        "todo",
        pick(newTodo, "_id", "title", "description")
      ),
      {
        status: 201,
      }
    );
  } catch (error) {}
};

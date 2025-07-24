import { NextResponse } from "next/server";

import { Category, User, Todo } from "@/models/todos";
import mongoose from "mongoose";
import { getAsSuccessResponse } from "@/utils/responseHandler";
import { connectToDB } from "@/lib/mongoose";

export const GET = async (request, { params }) => {
  const { todoId } = await params;
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return NextResponse.json(
      { status: "fail", message: "Invalid todo id" },
      { status: 400 }
    );
  }
  await connectToDB();
  const todo = await Todo.findById(todoId)
    .populate("category", "name -_id")
    .populate("createdBy", "username -_id");
  if (!todo) {
    return NextResponse.json(
      { status: "fail", message: "Todo not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(getAsSuccessResponse("todo", todo), { status: 200 });
};

export const PATCH = async (request, { params }) => {
  try {
    const { todoId } = await params;
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return NextResponse.json(
        { status: "fail", message: "Invalid todo id" },
        { status: 400 }
      );
    }

    await connectToDB();

    const updatedTodoFields = await request.json();

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      updatedTodoFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTodo) {
      return NextResponse.json(
        { status: "error", message: "Todo Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(getAsSuccessResponse("todo", updatedTodo), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { todoId } = await params;
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return NextResponse.json({ message: "Invalid todo id" }, { status: 400 });
    }
    await Todo.findByIdAndDelete(todoId);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log(error);
  }
};

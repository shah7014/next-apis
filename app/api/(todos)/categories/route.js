import { NextResponse } from "next/server";

import { User, Category, Todo } from "@/models/todos";
import { connectToDB } from "@/lib/mongoose";
import { getAsSuccessResponse } from "@/utils/responseHandler";

export const GET = async (request) => {
  try {
    await connectToDB();
    const categories = await Category.find();
    return NextResponse.json(getAsSuccessResponse("categories", categories), {
      status: 200,
    });
  } catch (error) {}
};

export const POST = async (request) => {
  try {
    await connectToDB();
    const categoryProposed = await request.json();
    const newCategory = await Category.create(categoryProposed);
    return NextResponse.json(getAsSuccessResponse("category", newCategory), {
      sttaus: 201,
    });
  } catch (error) {}
};

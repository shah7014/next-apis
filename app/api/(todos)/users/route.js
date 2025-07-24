import { NextResponse } from "next/server";

import { User, Category, Todo } from "@/models/todos";
import { connectToDB } from "@/lib/mongoose";
import { getAsSuccessResponse } from "@/utils/responseHandler";

export const POST = async (request) => {
  try {
    await connectToDB();
    const userProposed = await request.json();
    const newUser = await User.create(userProposed);
    return NextResponse.json(getAsSuccessResponse("user", newUser), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
};

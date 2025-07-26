import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDB } from "@/lib/mongoose";
import { User } from "@/models/auth";
import { generateAuthToken, generateRefreshToken } from "@/utils/jwtUtils";
import { getAsSuccessResponse } from "@/utils/responseHandler";

export const POST = async (request) => {
  try {
    const { username, email, password } = await request.json();
    await connectToDB();
    const newUser = await User.create({ username, email, password });
    const userResponse = {
      id: newUser["_id"],
      email: newUser.email,
      username: newUser.username,
    };
    return NextResponse.json(getAsSuccessResponse("user", userResponse), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

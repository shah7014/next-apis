import { connectToDB } from "@/lib/mongoose";
import { User } from "@/models/auth";
import { generateAuthToken, generateRefreshToken } from "@/utils/jwtUtils";
import { getAsSuccessResponse } from "@/utils/responseHandler";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { username, password } = await request.json();
    await connectToDB();
    // does user exist?
    const user = await User.findOne({ username }).select(
      "username password _id"
    );
    if (!user) {
      return new Response(null, { status: 401 });
    }
    // is password valid?
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return new Response(null, { status: 401 });
    }
    // All good. Generate the tokens
    const authToken = generateAuthToken(
      { id: user["_id"] },
      { expiresIn: "1h" }
    );
    const refreshToken = generateRefreshToken(
      { id: user["_id"] },
      { expiresIn: "7d" }
    );
    // Save refresh token in DB
    await User.findByIdAndUpdate(user["_id"], {
      refreshToken,
    });

    // setting authToken as response body
    const response = NextResponse.json(
      getAsSuccessResponse("token", authToken),
      {
        status: 200,
      }
    );
    // setting refresh token as La httpOnly cookie
    response.cookies.set("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "PRODUCTION",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

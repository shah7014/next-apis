import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDB } from "@/lib/mongoose";
import { User } from "@/models/auth";
import { generateAuthToken, generateRefreshToken } from "@/utils/jwtUtils";
import { getAsSuccessResponse } from "@/utils/responseHandler";

export const POST = async (request) => {
  try {
    const candidateUser = await request.json();
    await connectToDB();
    const newUser = await User.create(candidateUser);
    // Generate auth and refresh token
    const authToken = generateAuthToken(
      { id: newUser["_id"] },
      { expiresIn: "1h" }
    );
    const refreshToken = generateRefreshToken(
      { id: newUser["_id"] },
      { expiresIn: "7d" }
    );
    // Save refresh token in DB
    await User.findByIdAndUpdate(newUser["_id"], {
      refreshToken,
    });
    // Attach refresh token in cookie and send auth token as response
    const cookieStore = await cookies();
    cookieStore.set("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "PRODUCTION",
      maxAge: 7 * 24 * 60 * 60,
    });
    return NextResponse.json(getAsSuccessResponse("token", authToken), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

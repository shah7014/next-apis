import Post from "@/models/postModel";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectToDB();
    const body = await request.json();
    const newPost = await Post.create(body);
    return NextResponse.json(
      {
        status: "success",
        data: {
          post: {
            title: newPost.title,
            content: newPost.content,
          },
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

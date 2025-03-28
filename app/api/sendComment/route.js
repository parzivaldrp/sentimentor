import connectDB from '../../../lib/connectDb';
import Comment from '../../models/Comment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
 

  try {
    await connectDB();
    const reqBody = await req.json();
    const { name, comment } = reqBody;

    const newComment = new Comment({ name, comment });
    const savedComment = await newComment.save();

    return NextResponse.json({
      message: "Comment stored successfully",
      success: true,
      comment: savedComment,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import connectDB from '../../../lib/connectDb';
import Comment from '../../models/Comment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req = NextRequest) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const reqBody = await req.json();
      const { name, comment} = reqBody;
      console.log('Request body:', reqBody);    

      const newComment = new Comment({
        name,
        comment
      });

      const commentsa = await newComment.save();

      return NextResponse.json({
        message: "Comment strored successfully",
        success: true,
        commentsa
      });
    } catch (err) {
      console.error('Error:', err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}
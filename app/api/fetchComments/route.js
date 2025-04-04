
import { NextResponse } from 'next/server';
import Comment from '../../models/Comment'; 
import connectDB from '../../../lib/connectDb'; 

export async function GET() {
  try {
    await connectDB(); 
    const comments = await Comment.find(); 
    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
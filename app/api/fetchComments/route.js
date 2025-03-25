
import { NextRequest, NextResponse } from 'next/server';
import Comment from '../../models/Comment'; 
import connectDB from '../../../lib/connectDb'; 

export async function GET(req) {
  try {
    await connectDB(); 
    const comments = await Comment.find(); 
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
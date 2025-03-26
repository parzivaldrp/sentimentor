import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDb";
import Comment from "../../models/Comment";

export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json(); 

    if (!id) {
      return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
    }

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

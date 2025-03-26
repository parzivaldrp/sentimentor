import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const region = process.env.AWS_REGION; 

AWS.config.update({ region });

const comprehend = new AWS.Comprehend();

export async function POST(req) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const params = { Text: text, LanguageCode: "en" };
        const result = await comprehend.detectSentiment(params).promise();

        return NextResponse.json({ text, sentiment: result.Sentiment });
    } catch (error) {
        return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import { ComprehendClient, DetectSentimentCommand } from "@aws-sdk/client-comprehend";

const client = new ComprehendClient({ region: process.env.AWS_REGION });

export async function POST(req) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const params = { Text: text, LanguageCode: "en" };
        const command = new DetectSentimentCommand(params);
        const result = await client.send(command);

        return NextResponse.json({ text, sentiment: result.Sentiment });
    } catch (error) {
        console.error("Error analyzing sentiment:", error); // Log the error
        return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 });
    }
}
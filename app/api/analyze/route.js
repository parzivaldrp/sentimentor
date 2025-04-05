import { NextResponse } from "next/server";
import { ComprehendClient, DetectSentimentCommand } from "@aws-sdk/client-comprehend";

const region = process.env.AWS_REGION;

const comprehendClient = new ComprehendClient({ region });

export async function POST(req) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const command = new DetectSentimentCommand({
            Text: text,
            LanguageCode: "en",
        });

        const result = await comprehendClient.send(command);

        return NextResponse.json({ text, sentiment: result.Sentiment });
    } catch (error) {
        console.error("Sentiment analysis error:", error);
        return NextResponse.json({ error: "Failed to analyze sentiment" }, { status: 500 });
    }
}

"use client";

import { title, subtitle } from "@/components/primitives";
import CommentTabs from "@/components/CommentTabs/page";

export default function Home() {
  return (
    <section className="flex flex-row items-center   w-full h-full justify-center ">
      <div className="inline-block max-w-xl w-1/2 p-8 mt-8 flex-row  h-full   text-center justify-center">
        <span className={title()}>AI-Powered&nbsp;</span>
        <span className={title({ color: "violet" })}>Sentiment&nbsp;</span>
        <br />
        <span className={title()}>`Analysis 🧠 💬`</span>
        <div className={subtitle({ class: "mt-4" })}>
          Instant Sentiment Detection – Get AI-driven insights in seconds.
        </div>
        <div className="text-sm mt-2">
          Ever wondered how people feel about a comment, review, or message? Our
          AI-powered sentiment analysis tool helps you detect emotions in
          real-time—whether they are Positive, Negative, or Neutral.
        </div>
      </div>

      <div className="flex text-center  justify-center h-full w-1/2">
        <CommentTabs />
      </div>
    </section>
  );
}

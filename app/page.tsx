"use client";

import { title, subtitle } from "@/components/primitives";
import CommentTabs from "@/components/CommentTabs/page";




export default function Home() {


  return (
    
    <section className="flex flex-col md:flex-row items-center justify-center w-full h-full px-4 py-8 gap-8">
   
      {/* Text Section */}
      <div className="w-full md:w-1/2 max-w-xl text-center">
        <span className={title()}>AI-Powered&nbsp;</span>
        <span className={title({ color: "violet" })}>Sentiment&nbsp;</span>
        <br />
        <span className={title()}>Analysis 🧠 💬</span>
        <div className={subtitle({ class: "mt-4" })}>
          Instant Sentiment Detection – Get AI-driven insights in seconds.
        </div>
        <div className="text-sm mt-2 text-default-500 px-2 md:px-0">
          Ever wondered how people feel about a comment, review, or message?
          Our AI-powered sentiment analysis tool helps you detect emotions in
          real-time — whether they are Positive, Negative, or Neutral.
        </div>
      </div>

      {/* Comment Tabs */}
      <div className="w-full md:w-1/2 flex justify-center">
        <CommentTabs />
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Button } from "@heroui/button";

interface SentimentButtonProps {
  analyzeSentiment: () => void;
  loading: boolean;
}

const SentimentButton: React.FC<SentimentButtonProps> = ({
  analyzeSentiment,
  loading,
}) => {
  return (
    <Button
      color="primary"
      disabled={loading}
      size="sm"
      variant="flat"
      onClick={analyzeSentiment}
    >
      {loading ? "Analyzing..." : "Sentiment"}
    </Button>
  );
};

export default SentimentButton;

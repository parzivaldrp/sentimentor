"use client"

import React from 'react';
import { Button } from "@heroui/button";

interface SentimentButtonProps {
  analyzeSentiment: () => void;
  loading: boolean;
}

const SentimentButton: React.FC<SentimentButtonProps> = ({ analyzeSentiment, loading }) => {
  return (
    <Button
      color="primary"
      size="sm"
      variant="flat"
      onClick={analyzeSentiment}
      disabled={loading}
    >
      {loading ? "Analyzing..." : "Sentiment"}
    </Button>
  );
};

export default SentimentButton;
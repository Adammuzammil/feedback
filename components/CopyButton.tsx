"use client";

import { Clipboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
  const [tooltipText, setTooltipText] = useState("Copy");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setTooltipText("Copied");
      setTimeout(() => {
        setTooltipText("Copy");
      }, 2000);
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => copyToClipboard(text)}
            className="text-slate-50 absolute p-2 right-0 top-0"
          >
            <Clipboard />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;

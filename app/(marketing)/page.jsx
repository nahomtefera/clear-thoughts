"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/lib/icons";

export default function Component() {
  const [ prompt, setPrompt ] = useState("");

  const handleSubmitPrompt = () => {
    console.log('prompt: ', prompt)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-bold">Generate. Refine. Ship.</h1>
      <p className="text-lg text-muted-foreground">
        Generate UI with shadcn/ui from simple text prompts and images.
      </p>
      <div className="flex items-center w-full max-w-md p-4 space-x-2 bg-black rounded-md">
        <Input
          value={prompt}
          onChange={(e)=>{setPrompt(e.target.value)}}
          type="text"
          placeholder="A chat application"
          className="flex-1 bg-transparent border-none text-white placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
        />
        <Button
            onClick={handleSubmitPrompt}
            variant="ghost" 
            className="text-white"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

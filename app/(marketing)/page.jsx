"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//moment
import moment from 'moment';

const mockResponses = [
    {
      message: {
        content: "This thought could be viewed as negative because it is rooted in feelings of low self-worth and comparison to an ex-partner. Constantly seeking validation or worth through external circumstances, like job status, is not a sustainable or healthy mindset.\n\nA positive reframe could be: \"I am deserving of a job that brings me fulfillment and happiness, independently of my ex's opinions. I will focus on finding a job that aligns with my values and brings out the best in me.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 97,
        prompt_tokens: 53,
        total_tokens: 150,
      },
      createdAt: 1720046806,
    },
    {
      message: {
        content: "This thought seems negative as it stems from self-doubt and fear of failure. Such thinking can hinder progress and personal growth.\n\nA positive reframe could be: \"I have the skills and determination to succeed. I will learn from challenges and use them to improve myself.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 87,
        prompt_tokens: 47,
        total_tokens: 134,
      },
      createdAt: 1720046906,
    },
    {
      message: {
        content: "This thought is negative because it focuses on past mistakes and guilt, which can prevent moving forward.\n\nA positive reframe could be: \"I acknowledge my past mistakes and have learned from them. I will use this knowledge to make better decisions in the future.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 89,
        prompt_tokens: 51,
        total_tokens: 140,
      },
      createdAt: 1720047006,
    },
    {
      message: {
        content: "This thought is negative as it centers on worry about uncontrollable future events, leading to anxiety and stress.\n\nA positive reframe could be: \"I will focus on what I can control and take proactive steps to prepare for the future, trusting in my ability to handle challenges as they come.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 93,
        prompt_tokens: 49,
        total_tokens: 142,
      },
      createdAt: 1720047106,
    },
    {
      message: {
        content: "This thought appears negative because it emphasizes a lack of confidence and self-belief, which can limit potential.\n\nA positive reframe could be: \"I am capable and confident in my abilities. I will take on new challenges with a positive mindset and believe in my success.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 91,
        prompt_tokens: 47,
        total_tokens: 138,
      },
      createdAt: 1720047206,
    },
    {
      message: {
        content: "This thought is negative because it dwells on past failures and regrets, which can hinder personal growth and progress.\n\nA positive reframe could be: \"I acknowledge my past and the lessons it has taught me. I will use this knowledge to make better choices moving forward.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 88,
        prompt_tokens: 50,
        total_tokens: 138,
      },
      createdAt: 1720047306,
    },
    {
      message: {
        content: "This thought is negative as it focuses on external validation for self-worth. Relying on others' opinions can lead to insecurity and low self-esteem.\n\nA positive reframe could be: \"I value my own opinions and trust my judgment. I am worthy of love and respect regardless of what others think.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 95,
        prompt_tokens: 52,
        total_tokens: 147,
      },
      createdAt: 1720047406,
    },
    {
      message: {
        content: "This thought could be seen as negative because it emphasizes a lack of control over one's life. Feeling helpless can lead to stress and anxiety.\n\nA positive reframe could be: \"I have the power to change my circumstances. I will take small steps towards improving my situation and trust in my ability to make a difference.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 92,
        prompt_tokens: 50,
        total_tokens: 142,
      },
      createdAt: 1720047506,
    },
    {
      message: {
        content: "This thought is negative because it involves unrealistic expectations and perfectionism. Such thinking can lead to disappointment and burnout.\n\nA positive reframe could be: \"I will set realistic goals and celebrate my progress. I am proud of my achievements and will continue to strive for improvement without self-criticism.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 90,
        prompt_tokens: 48,
        total_tokens: 138,
      },
      createdAt: 1720047606,
    },
    {
      message: {
        content: "This thought is negative as it revolves around fear of judgment from others. Worrying about others' opinions can stifle self-expression and confidence.\n\nA positive reframe could be: \"I am confident in my own decisions and actions. I will not let fear of judgment from others dictate my choices and happiness.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 94,
        prompt_tokens: 51,
        total_tokens: 145,
      },
      createdAt: 1720047706,
    },
    {
      message: {
        content: "This thought appears negative because it focuses on scarcity and lack, which can create a mindset of fear and anxiety.\n\nA positive reframe could be: \"I trust in the abundance of opportunities available to me. I will focus on gratitude and the positive aspects of my life.\"",
        role: "assistant",
      },
      usage: {
        completion_tokens: 88,
        prompt_tokens: 47,
        total_tokens: 135,
      },
      createdAt: 1720047806,
    },
  ];
  
   

export default function Component() {

  const [ prompt, setPrompt ] = useState("");
  const [ responses, setResponses ] = useState(mockResponses);
  const bottomRef = useRef(null);

  const handleSubmitPrompt = async () => {
    try {
        // post request to server    
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ prompt })
        })
        // response
        const {message, usage, created} = await response.json();
        // update state
        setResponses([...responses, {message, usage, createdAt: created}]);
    } catch (error) {
        console.log('There was an error in the request: ', error)
    }
  }

  useEffect(() => {
    // Scroll to bottom whenever items change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [responses]);

  useEffect(()=> {
    console.log('responses: ', responses)
  }, [responses])

  return (
    <div className="pb-[5em] pt-[4em] flex flex-col items-center justify-center min-h-screen space-y-6">
    
      {/* <Headline /> */}
      
      <div className="w-full max-w-4xl space-y-4">
        {
            responses && responses.map( (response, key) => {
                return(
                    <div key={key} className="flex items-center justify-between px-4 py-2 rounded-md bg-muted">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">
                                    Assistant · {formatTimestamp(response.createdAt)}
                                </div>
                                <div className="text-base text-muted-foreground">
                                    {response.message.content}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                )
            })
        }
        <div ref={bottomRef} />
      </div>

      <PromptSender prompt={prompt} setPrompt={setPrompt} handleSubmitPrompt={handleSubmitPrompt} />

    </div>
  );
}

const PromptSender = ({prompt, setPrompt, handleSubmitPrompt}) => {
    return(
        <div className="sticky bottom-[2em] flex flex-col w-full max-w-md">
            <div className="flex items-center w-full max-w-md p-4 space-x-2 bg-black rounded-md">
                <Input
                value={prompt}
                onChange={(e)=>{setPrompt(e.target.value)}}
                type="text"
                placeholder="Write down your thought"
                className="flex-1 bg-transparent border-none text-white placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                />
                <Button onClick={handleSubmitPrompt} variant="ghost"  className="text-white" >
                    <ArrowRightIcon className="w-5 h-5" />
                </Button>
            </div>
            <span className="text-gray-600 text-base mt-2 pl-2">Thank you for stopping by 😸</span>
        </div>
    )
}


const Headline = () => {
    return (
        <>
            <h1 className="text-4xl font-bold">Generate. Refine. Ship.</h1>
            <p className="text-lg text-muted-foreground">
                Generate UI with shadcn/ui from simple text prompts and images.
            </p>
        </>
    )
}

const formatTimestamp = (timestamp) => {
    return moment.unix(timestamp).fromNow();
};
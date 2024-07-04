"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/lib/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "@/components/shared/loading"
//moment
import moment from 'moment';
//mockdata
import {mockResponses} from '@/lib/mockData'

export default function Component() {

  const [loading, setLoading] = useState(false)
  const [ prompt, setPrompt ] = useState("");
  const [ responses, setResponses ] = useState([]);
  const bottomRef = useRef(null);

  const handleSubmitPrompt = async () => {
    try {
        // post request to server
        setLoading(true);
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ prompt })
        })
        // response
        const {message, usage, created} = await response.json();
        // update state
        setLoading(false)
        setPrompt("")
        setResponses([...responses, {message, usage, createdAt: created, prompt:{content:prompt}}]);
    } catch (error) {
        setLoading(false)
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
    <div className="pb-[5em] pt-[4em] px-5 flex flex-col items-center justify-center min-h-screen space-y-6">
        
      {/* <Headline /> */}
      <div className="w-full max-w-4xl space-y-4">
        {
            responses && responses.map( (response, key) => {
                return(
                    <div key={key}>
                        {/* Propmt */}
                        <div className="flex justify-end">
                            <div  className="my-4 inline-block shadow-sm items-center justify-end px-4 py-3 rounded-md bg-black">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div className="text-base text-white">
                                            {response.prompt?.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Response */}
                        <div className="flex shadow-sm items-center justify-between px-4 py-3 rounded-md bg-[#fcfcfc]">
                            <div className="flex items-center gap-2">
                                <Avatar className="hidden md:block">
                                    <AvatarImage src="https://images.unsplash.com/photo-1638132035918-90a22beaab3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGV8ZW58MHx8MHx8fDI%3D" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="pl-6">
                                    <div className="font-medium text-base mb-2">
                                        Assistant · {formatTimestamp(response.createdAt)}
                                    </div>
                                    <div className="text-base text-muted-foreground">
                                        {response.message.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        <div ref={bottomRef} />
      </div>

      <PromptSender prompt={prompt} setPrompt={setPrompt} loading={loading} handleSubmitPrompt={handleSubmitPrompt} />

    </div>
  );
}

const PromptSender = ({prompt, setPrompt, handleSubmitPrompt, loading}) => {
    return(
        <div className="sticky bottom-[2em] flex flex-col w-full max-w-md">
            <div className="flex shadow-lg items-center w-full max-w-md p-4 space-x-2 bg-white rounded-md">
                <Input
                    value={prompt}
                    onChange={(e)=>{setPrompt(e.target.value)}}
                    type="text"
                    placeholder="Write down your thought"
                    className="flex-1 text-base bg-transparent border-none text-black placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 "
                />
                <Button onClick={handleSubmitPrompt} variant="ghost"  className={`text-white ${loading && 'hover:bg-transparent'}`} >
                    {
                        loading
                            ? <Loading width={10} height={10} noText={true} />
                            : <ArrowRightIcon className="w-5 h-5" />
                    }
                </Button>
            </div>
            {/* <span className="text-gray-600 text-base p-2 backdrop-blur-md">Thank you for stopping by 😸</span> */}
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
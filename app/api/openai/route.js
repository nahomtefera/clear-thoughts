import { NextResponse } from 'next/server';
// openai
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY });

export async function POST(req) {
    const { prompt } = await req.json();
    
    try {       
        const completion = await openai.chat.completions.create({
            messages:[{ role: "system", content: prompt}],
            model: "gpt-3.5-turbo"
        })
        const message = completion.choices[0].message;
        const usage = completion.usage;
        // Return succesful response
        return NextResponse.json( { message: message, usage: usage },  { status: 200 } );

    } catch(error) {
        console.log("error: ", error)
        // Return error response
        return NextResponse.json( { message: 'there was a problem in the request' },  { status: 500 } );
    }
}
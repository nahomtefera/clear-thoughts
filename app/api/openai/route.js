import { NextResponse } from 'next/server';
// openai
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY });

export async function POST(req) {
    const { prompt } = await req.json();
    const context = "You're a multilingual therapist. Briefly analyze if a thought is good or bad, explain why, and suggest a positive reframe, wrap the response as html elements, bold 'analysis' and 'positive frame' in a new line: ";

    try {       
        const completion = await openai.chat.completions.create({
            messages:[{ role: "system", content: context + prompt}],
            model: "gpt-3.5-turbo"
        })
        console.log(completion);
        const message = completion.choices[0].message;
        const usage = completion.usage;
        const created = completion.created;
        // Return succesful response
        return NextResponse.json( { message, usage, created},  { status: 200 } );

    } catch(error) {
        console.log("error: ", error)
        // Return error response
        return NextResponse.json( { message: 'there was a problem in the request' },  { status: 500 } );
    }
}
import { checkApiLimit, increaseApiLimit } from "@/lib/api_limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
// import { Configuration, OpenAIApi } from "openai-edge";
// import { OpenAIStream, StreamingTextResponse } from "ai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

//
// export const runtime = 'edge'

export async function POST(
    request: Request
) {
    try {
        const { userId } = auth();
        const body = await request.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })
        }

        const freeTriall = await checkApiLimit();

        if (!freeTriall) {
            return new NextResponse("Free trial has expired.", { status: 403 })
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 1,
            // stream: true,
            messages
        })

        await increaseApiLimit();
        
        //
        // const strem = OpenAIStream(response);

        // return new StreamingTextResponse(strem)

        return NextResponse.json(response.data.choices[0].message)
    } catch (error) {
        console.log("CONVERSATION_ERROR:", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
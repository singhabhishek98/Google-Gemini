import run from './gemini.js';

async function testRun() {
    const samplePrompt = "Tell me a story.";
    try {
        const response = await run(samplePrompt);
        console.log("Response from API:", response);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

testRun();

require('dotenv').config({ path: '../.env' });
const OpenAI = require('openai');

// Check if the API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in the .env file');
  process.exit(1);
}

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  try {
    // Example 1: Standard chat response
    console.log('Example 1: Standard Chat Response');
    const standardResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Summarize the main benefits of artificial intelligence in healthcare." }
      ],
    });
    
    console.log(standardResponse.choices[0].message.content);
    console.log('\n' + '-'.repeat(50) + '\n');

    // Example 2: JSON response format
    console.log('Example 2: JSON Response Format');
    const jsonResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant designed to output JSON." },
        { role: "user", content: "Give me data about the top 3 planets in our solar system by size. Include their name, diameter, and a fun fact." }
      ],
      response_format: { type: "json_object" }
    });
    
    console.log(jsonResponse.choices[0].message.content);
    console.log('\n' + '-'.repeat(50) + '\n');

    // Example 3: Multiple completions (variations)
    console.log('Example 3: Multiple Completions');
    const multipleCompletions = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Write a short tagline for a coffee shop." }
      ],
      n: 3,  // Generate 3 different completions
      temperature: 1.2,  // Higher temperature for more creative responses
    });
    
    multipleCompletions.choices.forEach((choice, index) => {
      console.log(`Variation ${index + 1}: ${choice.message.content}`);
    });
    console.log('\n' + '-'.repeat(50) + '\n');

    // Example 4: Streaming response
    console.log('Example 4: Streaming Response');
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Explain quantum computing in simple terms." }
      ],
      stream: true,
    });
    
    console.log("Streaming response (chunk by chunk):");
    let fullContent = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullContent += content;
      process.stdout.write(content);  // Print without newline
    }
    console.log('\n\nFull streamed content:', fullContent);
    console.log('\n' + '-'.repeat(50) + '\n');

    // Example 5: Function calling
    console.log('Example 5: Function Calling');
    const functionCallingResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What's the weather like in San Francisco?" }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Get the current weather in a given location",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "The city and state, e.g., San Francisco, CA",
                },
                unit: {
                  type: "string", 
                  enum: ["celsius", "fahrenheit"],
                  description: "The temperature unit to use."
                },
              },
              required: ["location"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });
    
    console.log('Function calling response:');
    console.log(JSON.stringify(functionCallingResponse.choices[0].message, null, 2));

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the examples
main();

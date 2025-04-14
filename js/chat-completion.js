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
    // Example chat completion request
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello! Can you tell me a brief fact about space?" }
      ],
      max_tokens: 150,
    });

    // Print the response
    console.log('Response from OpenAI:');
    console.log(completion.choices[0].message.content);
    console.log('\nUsage:');
    console.log(completion.usage);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();

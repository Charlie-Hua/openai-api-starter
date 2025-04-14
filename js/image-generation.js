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
    // Example image generation request
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "A serene lake surrounded by mountains at sunset",
      n: 1,
      size: "1024x1024",
    });

    // Print the URLs of the generated images
    console.log('Generated image URLs:');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();

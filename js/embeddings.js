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
    // Example embeddings request
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: "The quick brown fox jumps over the lazy dog",
    });

    // Print the embedding vector (first 5 values and length)
    const embeddingVector = embedding.data[0].embedding;
    console.log('Embedding vector (first 5 values):', embeddingVector.slice(0, 5));
    console.log('Embedding vector length:', embeddingVector.length);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();

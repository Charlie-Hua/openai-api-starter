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
    // Create an assistant
    console.log('Creating an assistant...');
    const assistant = await openai.beta.assistants.create({
      name: "Math Tutor",
      instructions: "You are a personal math tutor. Write and run code to answer math questions.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-3.5-turbo",
    });
    
    console.log(`Assistant created with ID: ${assistant.id}`);
    
    // Create a thread
    console.log('\nCreating a new thread...');
    const thread = await openai.beta.threads.create();
    console.log(`Thread created with ID: ${thread.id}`);
    
    // Add a message to the thread
    console.log('\nAdding a message to the thread...');
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "I need to solve the equation 3x + 11 = 14. Can you help me?",
    });
    
    // Run the assistant
    console.log('\nRunning the assistant...');
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });
    
    // Poll for the run to complete
    console.log(`Run created with ID: ${run.id}`);
    console.log('Waiting for the assistant to respond...');
    
    let runStatus = await waitForRunCompletion(thread.id, run.id);
    console.log(`Run completed with status: ${runStatus.status}`);
    
    // List messages
    console.log('\nRetrieving messages...');
    const messages = await openai.beta.threads.messages.list(thread.id);
    
    // Display the messages
    console.log('\nConversation:');
    messages.data.reverse().forEach((message) => {
      console.log(`${message.role.toUpperCase()}: ${message.content[0].text.value}`);
    });
    
    // Clean up (optional)
    console.log('\nDeleting the assistant...');
    await openai.beta.assistants.del(assistant.id);
    console.log('Assistant deleted.');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Helper function to wait for a run to complete
async function waitForRunCompletion(threadId, runId) {
  let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  
  // Poll for status change
  while (runStatus.status === "queued" || runStatus.status === "in_progress") {
    // Wait for 1 second before checking again
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log(`Current status: ${runStatus.status}`);
  }
  
  return runStatus;
}

// Run the example
main();

require('dotenv').config({ path: '../.env' });
const OpenAI = require('openai');
const readline = require('readline');

// Check if the API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in the .env file');
  process.exit(1);
}

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initial system prompt
const systemPrompt = "You are a knowledgeable and friendly assistant named Helpy. You keep your responses concise and helpful.";

// Keep track of conversation history
const conversationHistory = [
  { role: "system", content: systemPrompt }
];

// Function to get a response from OpenAI
async function getChatResponse(userInput) {
  try {
    // Add user message to history
    conversationHistory.push({ role: "user", content: userInput });
    
    // Keep conversation history within token limits (simple approach)
    if (conversationHistory.length > 10) {
      // Keep system prompt and remove oldest messages
      const systemMessage = conversationHistory[0];
      conversationHistory.splice(1, 2); // Remove oldest user & assistant messages
      
      // Ensure system prompt stays at the beginning
      if (conversationHistory[0].role !== "system") {
        conversationHistory.unshift(systemMessage);
      }
    }
    
    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      max_tokens: 150
    });
    
    const responseText = completion.choices[0].message.content;
    
    // Add assistant response to history
    conversationHistory.push({ role: "assistant", content: responseText });
    
    return responseText;
  } catch (error) {
    console.error('Error getting response:', error);
    return "Sorry, I encountered an error. Please try again.";
  }
}

// Function to run the chat loop
async function startChat() {
  console.log("Chat with Memory Example");
  console.log("------------------------");
  console.log("Type 'exit' to end the conversation.");
  console.log("Type 'history' to see the current conversation history.");
  console.log("Type 'clear' to start a new conversation.\n");
  
  let chatActive = true;
  
  while (chatActive) {
    const userInput = await new Promise(resolve => {
      rl.question('You: ', resolve);
    });
    
    if (userInput.toLowerCase() === 'exit') {
      chatActive = false;
      console.log("Ending chat. Goodbye!");
      rl.close();
    } else if (userInput.toLowerCase() === 'history') {
      console.log("\nConversation History:");
      conversationHistory.forEach((message, index) => {
        if (index === 0) return; // Skip system message
        console.log(`${message.role.toUpperCase()}: ${message.content}`);
      });
      console.log("");
    } else if (userInput.toLowerCase() === 'clear') {
      // Reset conversation history to just the system prompt
      conversationHistory.length = 0;
      conversationHistory.push({ role: "system", content: systemPrompt });
      console.log("Conversation history cleared.\n");
    } else {
      const response = await getChatResponse(userInput);
      console.log(`Assistant: ${response}\n`);
    }
  }
}

// Start the chat
startChat();

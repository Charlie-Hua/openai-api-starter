import os
import sys
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from the .env file
load_dotenv(dotenv_path='../.env')

# Check if the API key is set
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    print('OPENAI_API_KEY is not set in the .env file')
    sys.exit(1)

# Initialize the OpenAI client
client = OpenAI(api_key=api_key)

# Initial system prompt
system_prompt = "You are a knowledgeable and friendly assistant named Helpy. You keep your responses concise and helpful."

# Keep track of conversation history
conversation_history = [
    {"role": "system", "content": system_prompt}
]

def get_chat_response(user_input):
    """Get a response from OpenAI based on the conversation history."""
    try:
        # Add user message to history
        conversation_history.append({"role": "user", "content": user_input})
        
        # Keep conversation history within token limits (simple approach)
        if len(conversation_history) > 10:
            # Keep system prompt and remove oldest messages
            system_message = conversation_history[0]
            conversation_history.pop(1)  # Remove oldest user message
            if len(conversation_history) > 1:
                conversation_history.pop(1)  # Remove oldest assistant message
            
            # Ensure system prompt stays at the beginning
            if conversation_history[0]["role"] != "system":
                conversation_history.insert(0, system_message)
        
        # Get response from OpenAI
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=conversation_history,
            max_tokens=150
        )
        
        response_text = completion.choices[0].message.content
        
        # Add assistant response to history
        conversation_history.append({"role": "assistant", "content": response_text})
        
        return response_text
    
    except Exception as e:
        print(f"Error getting response: {e}")
        return "Sorry, I encountered an error. Please try again."

def start_chat():
    """Run the chat loop."""
    print("Chat with Memory Example")
    print("------------------------")
    print("Type 'exit' to end the conversation.")
    print("Type 'history' to see the current conversation history.")
    print("Type 'clear' to start a new conversation.\n")
    
    chat_active = True
    
    while chat_active:
        user_input = input("You: ")
        
        if user_input.lower() == 'exit':
            chat_active = False
            print("Ending chat. Goodbye!")
        elif user_input.lower() == 'history':
            print("\nConversation History:")
            for message in conversation_history:
                if message["role"] == "system":
                    continue  # Skip system message
                print(f"{message['role'].upper()}: {message['content']}")
            print("")
        elif user_input.lower() == 'clear':
            # Reset conversation history to just the system prompt
            conversation_history.clear()
            conversation_history.append({"role": "system", "content": system_prompt})
            print("Conversation history cleared.\n")
        else:
            response = get_chat_response(user_input)
            print(f"Assistant: {response}\n")

if __name__ == "__main__":
    start_chat()

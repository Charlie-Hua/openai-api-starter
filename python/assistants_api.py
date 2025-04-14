import os
import sys
import time
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

def wait_for_run_completion(thread_id, run_id):
    """Poll for run status until it completes."""
    run = client.beta.threads.runs.retrieve(
        thread_id=thread_id,
        run_id=run_id
    )
    
    while run.status in ["queued", "in_progress"]:
        # Wait for 1 second before checking again
        print(f"Current status: {run.status}")
        time.sleep(1)
        run = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
        )
    
    return run

def main():
    try:
        # Create an assistant
        print("Creating an assistant...")
        assistant = client.beta.assistants.create(
            name="Math Tutor",
            instructions="You are a personal math tutor. Write and run code to answer math questions.",
            tools=[{"type": "code_interpreter"}],
            model="gpt-3.5-turbo"
        )
        print(f"Assistant created with ID: {assistant.id}")
        
        # Create a thread
        print("\nCreating a new thread...")
        thread = client.beta.threads.create()
        print(f"Thread created with ID: {thread.id}")
        
        # Add a message to the thread
        print("\nAdding a message to the thread...")
        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content="I need to solve the equation 3x + 11 = 14. Can you help me?"
        )
        
        # Run the assistant
        print("\nRunning the assistant...")
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id
        )
        print(f"Run created with ID: {run.id}")
        print("Waiting for the assistant to respond...")
        
        # Poll for the run to complete
        run_result = wait_for_run_completion(thread.id, run.id)
        print(f"Run completed with status: {run_result.status}")
        
        # List messages
        print("\nRetrieving messages...")
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )
        
        # Display the messages
        print("\nConversation:")
        for message in reversed(list(messages.data)):
            role = message.role.upper()
            content = message.content[0].text.value
            print(f"{role}: {content}")
        
        # Clean up (optional)
        print("\nDeleting the assistant...")
        client.beta.assistants.delete(assistant.id)
        print("Assistant deleted.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()

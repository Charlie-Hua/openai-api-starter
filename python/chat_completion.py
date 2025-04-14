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

def main():
    try:
        # Example chat completion request
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello! Can you tell me a brief fact about space?"}
            ],
            max_tokens=150
        )

        # Print the response
        print('Response from OpenAI:')
        print(completion.choices[0].message.content)
        print('\nUsage:')
        print(completion.usage)
    except Exception as e:
        print(f'Error: {e}')

# Run the example
if __name__ == '__main__':
    main()

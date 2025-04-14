import os
import sys
import json
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
        # Example 1: Standard chat response
        print('Example 1: Standard Chat Response')
        standard_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Summarize the main benefits of artificial intelligence in healthcare."}
            ],
        )
        
        print(standard_response.choices[0].message.content)
        print('\n' + '-'*50 + '\n')

        # Example 2: JSON response format
        print('Example 2: JSON Response Format')
        json_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                {"role": "user", "content": "Give me data about the top 3 planets in our solar system by size. Include their name, diameter, and a fun fact."}
            ],
            response_format={"type": "json_object"}
        )
        
        print(json_response.choices[0].message.content)
        print('\n' + '-'*50 + '\n')

        # Example 3: Multiple completions (variations)
        print('Example 3: Multiple Completions')
        multiple_completions = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Write a short tagline for a coffee shop."}
            ],
            n=3,  # Generate 3 different completions
            temperature=1.2,  # Higher temperature for more creative responses
        )
        
        for i, choice in enumerate(multiple_completions.choices):
            print(f"Variation {i+1}: {choice.message.content}")
        print('\n' + '-'*50 + '\n')

        # Example 4: Streaming response
        print('Example 4: Streaming Response')
        stream = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Explain quantum computing in simple terms."}
            ],
            stream=True,
        )
        
        print("Streaming response (chunk by chunk):")
        full_content = ''
        for chunk in stream:
            content = chunk.choices[0].delta.content or ''
            full_content += content
            print(content, end='', flush=True)  # Print without newline
        
        print('\n\nFull streamed content:', full_content)
        print('\n' + '-'*50 + '\n')

        # Example 5: Function calling
        print('Example 5: Function Calling')
        function_calling_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "What's the weather like in San Francisco?"}
            ],
            tools=[
                {
                    "type": "function",
                    "function": {
                        "name": "get_weather",
                        "description": "Get the current weather in a given location",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "location": {
                                    "type": "string",
                                    "description": "The city and state, e.g., San Francisco, CA",
                                },
                                "unit": {
                                    "type": "string",
                                    "enum": ["celsius", "fahrenheit"],
                                    "description": "The temperature unit to use."
                                },
                            },
                            "required": ["location"],
                        },
                    },
                },
            ],
            tool_choice="auto",
        )
        
        print('Function calling response:')
        print(json.dumps(function_calling_response.model_dump(), indent=2))

    except Exception as e:
        print(f'Error: {e}')

if __name__ == "__main__":
    main()

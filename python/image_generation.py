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
        # Example image generation request
        response = client.images.generate(
            model="dall-e-3",
            prompt="A serene lake surrounded by mountains at sunset",
            n=1,
            size="1024x1024"
        )

        # Print the URLs of the generated images
        print('Generated image URL:')
        print(response.data[0].url)
    except Exception as e:
        print(f'Error: {e}')

# Run the example
if __name__ == '__main__':
    main()

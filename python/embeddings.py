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
        # Example embeddings request
        embedding = client.embeddings.create(
            model="text-embedding-ada-002",
            input="The quick brown fox jumps over the lazy dog"
        )

        # Print the embedding vector (first 5 values and length)
        embedding_vector = embedding.data[0].embedding
        print('Embedding vector (first 5 values):', embedding_vector[:5])
        print('Embedding vector length:', len(embedding_vector))
    except Exception as e:
        print(f'Error: {e}')

# Run the example
if __name__ == '__main__':
    main()

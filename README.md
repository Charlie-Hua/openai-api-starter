# OpenAI API Starter

A simple starter project for experimenting with the OpenAI API. This repository includes basic examples for both JavaScript (Node.js) and Python implementations.

## Getting Started

### Prerequisites

- An OpenAI API key (get one at [OpenAI's website](https://platform.openai.com/))
- Node.js or Python installed on your system

### Setup

1. Clone this repository
2. Create a `.env` file based on `.env.example` and add your OpenAI API key
3. Choose your preferred language and follow the setup instructions below

## JavaScript (Node.js) Setup

```bash
# Install dependencies
npm install

# Run the example
node js/chat-completion.js
# Or try other examples
node js/image-generation.js
node js/embeddings.js
node js/assistants-api.js
```

## Python Setup

```bash
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the example
python python/chat_completion.py
# Or try other examples
python python/image_generation.py
python python/embeddings.py
python python/assistants_api.py
```

## Examples Included

- Chat completions using GPT models
- Image generation using DALL-E
- Text embeddings
- Assistants API (creating assistants, threads, and running conversations)

## Assistants API Example

The Assistants API examples demonstrate how to:

1. Create an assistant with specific instructions and capabilities
2. Create a thread for conversation
3. Add user messages to the thread
4. Run the assistant on the thread
5. Retrieve and display the conversation

This is useful for building conversational AI applications with memory and specialized tools.

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [OpenAI Cookbook](https://github.com/openai/openai-cookbook)
- [OpenAI Assistants API Guide](https://platform.openai.com/docs/assistants/overview)

## License

MIT

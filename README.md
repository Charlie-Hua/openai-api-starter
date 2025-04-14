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

# Run basic examples
node js/chat-completion.js
node js/image-generation.js
node js/embeddings.js

# Run advanced examples
node js/assistants-api.js
node js/chat-response-formats.js
node js/chat-with-memory.js
```

## Python Setup

```bash
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run basic examples
python python/chat_completion.py
python python/image_generation.py
python python/embeddings.py

# Run advanced examples
python python/assistants_api.py
python python/chat_response_formats.py
python python/chat_with_memory.py
```

## Examples Included

### Basic Examples
- Chat completions using GPT models
- Image generation using DALL-E
- Text embeddings

### Advanced Examples
- **Assistants API**: Creating assistants, threads, and running conversations with tools
- **Chat Response Formats**: Different ways to customize and format chat responses
- **Chat with Memory**: Interactive chat with conversation history management

## Chat Response Formats Example

The Chat Response Formats examples showcase various ways to use the Chat Completions API:

1. **Standard Chat Responses**: Basic completions with default settings
2. **JSON Mode**: Forcing structured JSON output for parsing
3. **Multiple Completions**: Generating multiple response variations
4. **Streaming**: Receiving responses token-by-token in real-time
5. **Function Calling**: Having the model identify when to call functions and with what parameters

## Chat with Memory Example

The Chat with Memory examples demonstrate how to:

1. Build an interactive command-line chat interface
2. Maintain conversation history for contextual responses
3. Implement simple conversation management (viewing history, clearing context)
4. Handle token limits by pruning older messages

This provides a foundation for building chat applications where the model remembers previous parts of the conversation.

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
- [Chat Completions Guide](https://platform.openai.com/docs/guides/text-generation)

## License

MIT

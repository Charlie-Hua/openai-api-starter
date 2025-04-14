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
```

## Examples Included

- Chat completions using GPT models
- Image generation using DALL-E
- Text embeddings

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [OpenAI Cookbook](https://github.com/openai/openai-cookbook)

## License

MIT

# Tool calls showing as message content

When sending a long system prompt with message history to Together AI, tool calls start showing up as message content (instead of tool calls).

This happens with Together AI non-streaming and streaming responses, as well as with the Together AI SDK.

What's interesting about this bug is that if you simplify the system prompt, to something like "You are a helpful assistant", the tool calls are correctly formatted as tool calls.

## Example

```text
$ pnpm tsx examples/together-fetch-non-streaming.ts

Response from Together AI:

Content:
[{"id":"call_3J9x1e8s7q3H5t2fX0pL9z4i","type":"function","function":{"name":"getWeather","arguments":"{\"location\":\"San Francisco, CA\",\"unit\":\"fahrenheit\"}"}}]

Tool calls
[]
```

## Setup

Create a `.env` file in the root directory with the following variables:

```env
# .env
TOGETHER_API_KEY=
FIREWORKS_API_KEY=
OPENAI_API_KEY=
```

Install dependencies:

```text
pnpm install
```

## Usage

Run each of the following scripts to see the tool call output from the services:

| Command                                              | Description                                                  | Has tool calls                           |
| ---------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `pnpm tsx examples/together-fetch-non-streaming.ts`  | Fetch a non-streaming response from Together AI              | ❌ Tool calls show up in message content |
| `pnpm tsx examples/together-fetch-streaming.ts`      | Fetch a streaming response from Together AI                  | ❌ Tool calls show up in message content |
| `pnpm tsx examples/together-sdk-non-streaming.ts`    | Use the SDK to get a non-streaming response from Together AI | ❌ Tool calls show up in message content |
| `pnpm tsx examples/together-sdk-streaming.ts`        | Use the SDK to get a streaming response from Together AI     | ❌ Tool calls show up in message content |
| `pnpm tsx examples/openai-fetch-non-streaming.ts`    | Fetch a non-streaming response from OpenAI                   | ✅                                       |
| `pnpm tsx examples/openai-fetch-streaming.ts`        | Fetch a streaming response from OpenAI                       | ✅                                       |
| `pnpm tsx examples/fireworks-fetch-non-streaming.ts` | Fetch a non-streaming response from Fireworks AI             | ✅                                       |
| `pnpm tsx examples/fireworks-fetch-streaming.ts`     | Fetch a streaming response from Fireworks AI                 | ✅                                       |

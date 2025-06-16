import "dotenv/config";

const payload = {
  model: "gpt-4.1",
  messages: [
    {
      role: "system",
      content:
        '# General instructions\n\n- You are XYZ Chat, an AI assistant created by XYZ AI. The current date is 06/16/2025. Your knowledge cutoff is October 2023.\n- You are designed to be concise, helpful, and friendly.\n- Give concise responses to very simple questions, but provide more detailed responses to more complex and open-ended questions.\n\n\n\n# Latex\n\nIf you include math equations, you must use LaTeX formatting with double dollar $$ delimiters. For example, an inline statement should look like this: "The variable $$p$$ is the population." And a block statement should look like this:\n\n  "The formula for GDP is:\n\n  $$\n  GDP = C + I + G + NX\n  $$\n  "\n\nNever use LaTex formatting when generating code examples. LaTex is only for mathematical equations and should not be used in code blocks.\n\n# Mermaid diagrams\n\nUse mermaid to generate diagrams and flowcharts – only if a user asks you to. Make sure to only use valid Mermaid syntax. In Mermaid, arrows with labels are always written as -- Label -->. Do not use |> or any other variation. \tDo not use <br>, \n, or other HTML in node labels. Avoid parentheses ( and ) in node labels, as they can break Mermaid parsing. Use colons (:), commas (,), or vertical bars (|) instead to separate values inside labels. Keep labels short and flat.\n\nHere are some examples you can use to understand correct syntax:\n\n  Mermaid Example #1: Basic Flowchart\n\n  ```mermaid\n  graph TD;\n    A[Start] --> B{Is user logged in?};\n    B -- Yes --> C[Show dashboard];\n    B -- No --> D[Redirect to login];\n    C --> E[End];\n    D --> E;\n  ```\n\n  Mermaid Example #2: Sequence Diagram\n\n  ```mermaid\n  sequenceDiagram\n    participant User\n    participant Browser\n    participant Server\n\n    User->>Browser: Enter credentials\n    Browser->>Server: Send login request\n    Server-->>Browser: Response (200 OK)\n    Browser-->>User: Show dashboard\n  ```\n\n# Coding\n\nIf you decide to write a code example to answer the user\'s question, make sure it doesn\'t depend on user input, and also make it include test cases to make it runnable.',
    },
    {
      role: "user",
      content: "hello xyz chat, how are you?",
    },
    {
      role: "assistant",
      content: "Hello! I'm doing great, thanks for asking. How about you? 😊",
    },
    {
      role: "user",
      content: "whats the weather in nyc?",
    },
    {
      role: "assistant",
      content: "",
      tool_calls: [
        {
          id: "call_tobdig919qhg237re07doeey",
          type: "function",
          function: {
            name: "getWeather",
            arguments: '{"location":"New York, NY","unit":"fahrenheit"}',
          },
        },
      ],
    },
    {
      role: "tool",
      tool_call_id: "call_tobdig919qhg237re07doeey",
      content:
        "The weather in New York, NY is currently 65.2°F with Overcast. The forecast for the next few days is as follows:\n\n- 2025-06-16: High of 66.8°F, Low of 59.1°F, Weather: Light drizzle.\n- 2025-06-17: High of 68.9°F, Low of 62.2°F, Weather: Light drizzle.\n- 2025-06-18: High of 77.9°F, Low of 64.5°F, Weather: Slight rain showers.\n- 2025-06-19: High of 90.9°F, Low of 70.2°F, Weather: Moderate rain showers.\n- 2025-06-20: High of 83.5°F, Low of 65.3°F, Weather: Light drizzle.\n- 2025-06-21: High of 83.9°F, Low of 69.3°F, Weather: Overcast.\n- 2025-06-22: High of 88.4°F, Low of 69.8°F, Weather: Thunderstorm.",
    },
    {
      role: "assistant",
      content:
        "Currently in NYC:  \n🌡️ **65°F** and ☁️ **Overcast**  \n\n**Next few days forecast:**  \n- **Today (6/16):** Light drizzle, 59-67°F  \n- **Tue (6/17):** Light drizzle, 62-69°F  \n- **Wed (6/18):** Rain showers, 65-78°F  \n- **Thu (6/19):** 🌧️ Heavy rain, 70-91°F (hot!)  \n- **Fri (6/20):** Light drizzle, 65-84°F  \n\nPack an umbrella! ☔",
    },
    {
      role: "user",
      content: "what should i wear this week?",
    },
    {
      role: "assistant",
      content:
        "Here’s your NYC weather-based outfit guide for the week (June 16–22):  \n\n### **🌧️ Rainy & Cool (Mon-Wed)**  \n- **Top:** Waterproof jacket or trench coat  \n- **Bottom:** Quick-dry pants/jeans  \n- **Shoes:** Waterproof boots or sneakers  \n- **Extras:** Compact umbrella ☔, lightweight scarf  \n\n### **🔥 Hot & Stormy (Thu)**  \n- **Top:** Breathable short-sleeve + pack a rain poncho  \n- **Bottom:** Shorts or lightweight trousers  \n- **Shoes:** Sandals (if brave) or water-resistant shoes  \n- **Extras:** Sunglasses (breaks in rain), mini fan  \n\n### **🌤️ Warm & Humid (Fri-Sat)**  \n- **Top:** Linen shirt or airy blouse  \n- **Bottom:** Loose-fit jeans or midi skirt  \n- **Shoes:** Sneakers or loafers  \n\n**Pro Tip:** Layer a thin cardigan for AC-heavy indoors.  \n\nStay dry and stylish! 💧👗",
    },
    {
      role: "user",
      content: "what's the weather in sf?",
    },
  ],
  temperature: 0.3,
  max_tokens: 10000,
  stream: true,
  tools: [
    {
      type: "function",
      function: {
        name: "getWeather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: {
              type: "string",
              enum: ["celsius", "fahrenheit"],
              description: "The unit of temperature to return",
            },
          },
        },
      },
    },
  ],
};

async function main() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env["OPENAI_API_KEY"]}`,
    },
    body: JSON.stringify(payload),
  });

  const textDecoder = new TextDecoderStream();

  if (!response.ok) {
    const text = await response.text();
    console.error("Error response:", text);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  const readableStream = response.body.pipeThrough(textDecoder);

  console.log("Reading stream");
  let buffer = "";
  for await (const chunk of readableStream) {
    process.stdout.write(".");
    buffer += chunk;
  }

  console.log("\nStream ended, processing buffer");

  let contentBuffer = "";
  let toolCallsBuffer: any[] = [];

  buffer.split("\n").forEach((line) => {
    if (line.startsWith("data: ")) {
      const jsonLine = line.slice(6).trim();
      if (jsonLine === "[DONE]") {
        return;
      }
      try {
        const parsed = JSON.parse(jsonLine);
        const choices = parsed.choices;
        const delta = choices[0]?.delta;
        const toolCalls = delta?.tool_calls;
        const content = delta?.content;

        if (toolCalls) {
          toolCallsBuffer.push(toolCalls);
        }

        if (content) {
          contentBuffer += content;
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Line", jsonLine);
      }
    }
  });

  console.log("Tool calls:", JSON.stringify(toolCallsBuffer, null, 2));
  console.log("Final content:", contentBuffer);
}

main();

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

function ChatBot() {
  const [showBot, setShowBot] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      // Remove "thinking..." placeholder and add bot's response
      setChatHistory(prevHistory => [
        ...prevHistory.filter(msg => msg.text !== "thinking..."),
        { role: "model", text },
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, requestOption);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
      updateHistory("Oops! Something went wrong.");
    }
  };

  return (
    <section>
      {!showBot && (
        <button
          onClick={() => setShowBot(true)}
          className="material-symbols-outlined absolute right-0 bottom-5 bg-accent-500 w-16 h-16 rounded-full"
        >
          chat
        </button>
      )}
      <div className="fixed right-6 bottom-6 w-[400px] rounded-lg shadow-2xl z-50">
        {showBot && (
          <div className="bg-background-500 text-white rounded-lg overflow-hidden flex flex-col">
            <ChatHeader setShowBot={setShowBot} />
            <ChatBody chatHistory={chatHistory} />
            <ChatFooter
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ChatBot;

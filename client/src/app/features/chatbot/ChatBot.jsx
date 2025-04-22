import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

function ChatBot() {
  const [showBot, setShowBot] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const gereateBotResponse = (histroy) => {
    console.log(histroy);
  }

  return (
    <section className="">
      {!showBot && <button onClick={() => setShowBot(true)} className="material-symbols-outlined absolute right-0 bottom-5 bg-accent-500 w-16 h-16 rounded-full">
        chat
      </button>}
      <div className="fixed right-6 bottom-6 w-[400px] rounded-lg shadow-2xl z-50">
        {showBot && (
          <div className="bg-background-500 text-white rounded-lg overflow-hidden flex flex-col">
            <ChatHeader setShowBot={setShowBot} />

            <ChatBody chatHistory={chatHistory} />

            <ChatFooter setChatHistory={setChatHistory} gereateBotResponse={gereateBotResponse} />
          </div>
        )}
      </div>
    </section>
  );
}

export default ChatBot;

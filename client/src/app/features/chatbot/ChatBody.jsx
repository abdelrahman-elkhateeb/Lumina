import ChatMessage from "./ChatMessage";

function ChatBody({ chatBodyRef, chatHistory }) {
  return (
    <div
      ref={chatBodyRef}
      className="bg-background-700 px-4 py-5 space-y-4 max-h-[400px] overflow-y-auto scroll"
    >
      {/* First Bot Message */}
      <div className="message bot-message flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="material-symbols-outlined text-3xl text-primary-400 bg-primary-900 p-2 rounded-full shadow-md">
            smart_toy
          </span>
        </div>
        <div className="bg-gradient-to-br from-primary-500 to-primary-400 text-white p-4 rounded-2xl shadow-lg max-w-[80%] leading-relaxed text-sm sm:text-base">
          Hey there 👋<br />How can I help you today?
        </div>
      </div>

      {/* Chat Messages */}
      {chatHistory.map((chat, index) => (
        <ChatMessage chat={chat} key={index} />
      ))}
    </div>
  );
}

export default ChatBody;

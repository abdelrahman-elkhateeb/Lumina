function ChatMessage({ chat }) {
  const isBot = chat.role === "model";

  return (
    <div className={`message ${isBot ? "bot-message" : "user-message"} flex ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <span className="material-symbols-outlined text-primary-500">
          smart_toy
        </span>
      )}
      <p className={`${isBot ? "bg-secondary-700" : "bg-primary-500"} text-white p-3 rounded-lg max-w-[80%]`}>
        {chat.text}
      </p>
    </div>
  );
}

export default ChatMessage;

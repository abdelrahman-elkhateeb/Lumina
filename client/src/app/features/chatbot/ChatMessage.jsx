function ChatMessage({ chat }) {
  return (
    <div className="message user-message flex justify-end">
      {chat.role === "model" && <span className="material-symbols-outlined text-primary-500">smart_toy</span>}
      <p className={chat.role === "model" ? `"bg-secondary-700 text-white p-3 rounded-lg max-w-[80%]"` : `bg-primary-500 text-white p-3 rounded-lg max-w-[80%]`}>
        {chat.text}
      </p>
    </div>
  )
}

export default ChatMessage

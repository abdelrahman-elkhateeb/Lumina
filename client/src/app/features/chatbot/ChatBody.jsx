import ChatMessage from "./ChatMessage"

function ChatBody({ chatHistory }) {
  return (
    <div className="bg-background-700 px-4 py-5 space-y-4 max-h-[400px] overflow-y-auto scroll">
      <div className="message bot-message flex gap-2 items-start">
        <span className="material-symbols-outlined text-primary-500">smart_toy</span>
        <p className="bg-primary-500 text-white p-3 rounded-lg max-w-[80%]">
          Hey there 👋<br />How can I help you today?
        </p>
      </div>
      {chatHistory.map((chat, index) => (
        <ChatMessage chat={chat} key={index} />
      ))}


    </div>
  )
}

export default ChatBody

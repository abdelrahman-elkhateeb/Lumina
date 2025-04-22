function ChatHeader({ setShowBot }) {
  return (
    <div className="bg-primary-500 px-4 py-3 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <span className="material-symbols-outlined text-white">smart_toy</span>
        <h2 className="font-semibold">LED BOT</h2>
      </div>
      <button className="flex items-center gap-2" onClick={() => setShowBot(prev => !prev)}>
        <button className="material-symbols-outlined font-bold hover:text-accent-500 text-white transition">
          arrow_drop_down
        </button>
      </button>
    </div>
  )
}

export default ChatHeader

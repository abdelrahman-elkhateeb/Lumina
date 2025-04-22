import { useRef } from "react";

function ChatFooter({ chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    // Add user message
    setChatHistory(history => [...history, { role: "user", text: userMessage }]);

    // Add thinking message, then trigger bot response
    setTimeout(() => {
      setChatHistory(history => {
        const updatedHistory = [...history, { role: "model", text: "thinking..." }];
        generateBotResponse(updatedHistory); // trigger response with full context
        return updatedHistory;
      });
    }, 600);

    inputRef.current.value = '';
  };

  return (
    <div className="bg-background-500 px-4 py-3 border-t border-primary-700">
      <form
        action="#"
        className="flex items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-background-700 text-white placeholder-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
        <button type="submit">
          <span className="material-symbols-outlined text-accent-500 hover:text-accent-700 transition">
            arrow_upward
          </span>
        </button>
      </form>
    </div>
  );
}

export default ChatFooter;

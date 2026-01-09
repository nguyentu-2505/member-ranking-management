import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const AssistantChatbox = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, I am the club assistant, powered by AI. How may I assist you today?",
      sender: 'bot',
    },
  ]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate bot response placeholder for now
    setTimeout(() => {
      setMessages(prev => [...prev, { id: prev.length + 1, text: "I'm not connected to Gemini yet!", sender: 'bot' }]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  return (
    <>
      {/* Chatbox Container */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-full md:w-125 bg-white shadow-2xl flex flex-col z-100 animate-slide-in-right font-sans border-l border-gray-100">
          
          {/* Header */}
          <div className="bg-white text-gray-800 p-6 flex justify-between items-start shrink-0 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-bold text-xl leading-tight">GDG Assistant</h3>
                <p className="text-gray-500 text-sm">Your assistant powered by AI</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <Icon name="close" size="28px" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-white bg-[linear-gradient(#f0f0f0_1px,transparent_1px),linear-gradient(90deg,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px] flex flex-col gap-6">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`flex max-w-[85%] ${msg.sender === 'bot' ? 'flex-row gap-4' : 'flex-row-reverse'}`}>
                  
                  {msg.sender === 'bot' && (
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-2">
                       <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" alt="AI" className="w-full h-full" />
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl text-base leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-[#1e1e2e] text-white rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex: What are some events that the club will host in the future?"
                className="w-full pl-6 pr-14 py-4 bg-white text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none placeholder:text-gray-400 text-base shadow-sm transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`absolute right-3 p-2 rounded-lg transition-colors ${
                  inputValue.trim() 
                    ? 'bg-white text-blue-600 hover:bg-blue-50' 
                    : 'bg-transparent text-gray-300 cursor-not-allowed'
                }`}
              >
                <Icon name="send" size="24px" fill={inputValue.trim()} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssistantChatbox;

import React, { useState, useEffect } from "react";
import { Send, Mic, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const BotMascot = () => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center shadow-lg"
  >
    <motion.div
      animate={{
        y: [0, -1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="relative"
    >
      {/* Bot Face */}
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
        <motion.div
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="flex space-x-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        </motion.div>
      </div>
      {/* Smile */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-blue-400 rounded-full" />
    </motion.div>
  </motion.div>
);

const TypingIndicator = () => (
  <div className="flex space-x-1 px-3 py-2">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.1,
        }}
        className="w-2 h-2 rounded-full bg-blue-300"
      />
    ))}
  </div>
);

export function ContextualAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user'; text: string }>>([
    { type: 'bot', text: "Hi! I'm your travel buddy. How can I help you today? 😊" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { t } = useTranslation();

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: "I'm processing your request! 🌟" }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[1000]">
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "w-80 h-[500px]" : "w-12 h-12"
        }`}
      >
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-50/90 to-pink-100/90 backdrop-blur-xl border border-white/50 shadow-lg overflow-hidden">
          {isExpanded ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-blue-200/50 to-purple-200/50 flex items-center space-x-3">
                <BotMascot />
                <div>
                  <h3 className="font-medium text-gray-800">Travel Assistant</h3>
                  <p className="text-sm text-gray-600">Always here to help! ✨</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 mr-2 flex-shrink-0">
                        <BotMascot />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-purple-400/90 to-pink-400/90 text-white'
                          : 'bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800'
                      } shadow-md`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center"
                  >
                    <div className="w-8 h-8 mr-2">
                      <BotMascot />
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-md">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white/50">
                <div className="relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full px-4 py-2 pr-12 bg-white/70 rounded-2xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 placeholder-gray-400 resize-none"
                    style={{ height: '44px', maxHeight: '120px' }}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button
                      onClick={handleSend}
                      className="p-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 rounded-full text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <BotMascot />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
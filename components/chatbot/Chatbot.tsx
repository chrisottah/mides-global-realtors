"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Minimize2, Maximize2, Phone } from "lucide-react";
import { ChatMessage, getChatbotResponse, getInitialMessages } from "./ChatbotLogic";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(getInitialMessages());
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const { response, needsWhatsApp } = getChatbotResponse(userMessage.text);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        needsWhatsApp,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleWhatsAppRedirect = (message?: string) => {
    const whatsappNumber = "2349033581493";
    const text = message || "Hello Gloria! I need assistance with a property from Mides Global Realtors.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Floating chat button (when chat is closed)
  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </motion.button>
    );
  }

  // Chat window (when open)
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed z-50"
          style={{
            bottom: '24px',
            right: '24px',
            left: 'auto',
            top: 'auto',
          }}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
              isMinimized ? "w-72 h-14" : "w-[90vw] md:w-96"
            }`}
            style={{
              maxHeight: isMinimized ? '56px' : '80vh',
              height: isMinimized ? '56px' : 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header - Always visible */}
            <div className="bg-accent px-4 py-3 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold text-sm">Mides AI Assistant</h3>
                  <p className="text-white/70 text-xs">Online • Ask me anything</p>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/70 hover:text-white transition p-1"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Content - Only show when not minimized */}
            {!isMinimized && (
              <>
                {/* Messages - Scrollable */}
                <div className="overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ flex: 1, minHeight: 0 }}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                          message.isUser
                            ? "bg-accent text-white rounded-br-sm"
                            : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                        {message.needsWhatsApp && (
                          <button
                            onClick={() => handleWhatsAppRedirect()}
                            className="mt-2 flex items-center gap-2 text-xs bg-[#25D366] text-white px-3 py-1.5 rounded-full hover:bg-opacity-90 transition"
                          >
                            <Phone className="w-3 h-3" />
                            Chat with Gloria on WhatsApp
                          </button>
                        )}
                        <p className="text-[10px] opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input - Fixed at bottom */}
                <div className="p-3 border-t bg-white flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about properties, locations..."
                      className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-accent text-white p-2 rounded-full hover:bg-opacity-85 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    Ask about properties, services, locations, or contact info
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
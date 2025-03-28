'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useChatState } from '../../hooks/useChatState';

export default function AIBlendChatPage() {
  // Get chat state from custom hook
  const { 
    phase, 
    messageCount,
    fragrance, 
    setPhase,
    incrementMessageCount, 
    initializeFragrance,
    updateNoteSelection,
    updateFragranceName
  } = useChatState();
  
  // Local state for chat UI
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Reference to chat container for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Handle message submission
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    
    // Get the user's message and reset input
    const userMessage = input;
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      // Initialize fragrance data if this is the first meaningful user message
      if (phase === 'initial' && !fragrance && messageCount === 0) {
        initializeFragrance(userMessage);
      }
      
      // Increment message count (which may also update phase)
      incrementMessageCount();
      
      // Make API request
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          phase,
          fragrance,
          messageCount: messageCount + 1 // We just incremented it
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }]);
      
      // Update fragrance data if the API extracted any
      if (data.fragranceUpdate) {
        handleFragranceUpdate(data.fragranceUpdate);
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'すみません、エラーが発生しました。もう一度試してください。' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle extracted fragrance data updates
  const handleFragranceUpdate = (update: any) => {
    // Handle top note updates
    if (update.top_note && phase === 'top_note') {
      updateNoteSelection('top_note', update.top_note.options, update.top_note.selected);
    }
    
    // Handle middle note updates
    if (update.middle_note && phase === 'middle_note') {
      updateNoteSelection('middle_note', update.middle_note.options, update.middle_note.selected);
    }
    
    // Handle base note updates
    if (update.base_note && phase === 'base_note') {
      updateNoteSelection('base_note', update.base_note.options, update.base_note.selected);
    }
    
    // Handle name candidate updates
    if (update.name_candidates && phase === 'naming') {
      updateFragranceName(update.name_candidates, update.selected_name);
    }
  };
  
  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setInput(option);
  };
  
  // Render option buttons based on current phase
  const renderOptions = () => {
    if (!fragrance) return null;
    
    let options: string[] = [];
    
    // Determine which options to show based on phase
    if (phase === 'top_note' && fragrance.top_note.options.length > 0) {
      options = fragrance.top_note.options;
    } else if (phase === 'middle_note' && fragrance.middle_note.options.length > 0) {
      options = fragrance.middle_note.options;
    } else if (phase === 'base_note' && fragrance.base_note.options.length > 0) {
      options = fragrance.base_note.options;
    } else if (phase === 'naming' && fragrance.name_candidates.length > 0) {
      options = fragrance.name_candidates;
    }
    
    if (options.length === 0) return null;
    
    return (
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">オプションを選択:</p>
        <div className="flex flex-wrap gap-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-sm hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">AIと一緒に、香りをつくろう</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          好きな香りを伝えるだけで、AIがあなただけの香水を提案します。
        </p>
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
          現在のフェーズ: {phase} (メッセージ数: {messageCount})
        </div>
      </div>

      {/* Chat container */}
      <div
        id="chat-container"
        ref={chatContainerRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 h-[400px] border border-gray-200 dark:border-gray-700 overflow-y-auto space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <p className="mb-2">メッセージを送信して会話を始めましょう！</p>
              <p className="text-sm">例: 「夏の海を思い出す爽やかな香りがほしい」</p>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-lg p-3 rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Option buttons (when available) */}
      <div className="px-4 pb-4">
        {renderOptions()}
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="メッセージを入力..."
          className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className={`rounded-full p-2 ${
            isLoading || !input.trim()
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
              : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      
      {phase === 'completed' && fragrance && fragrance.selected_name && (
        <div className="mt-8 text-center">
          <p className="text-lg mb-4">あなたの香水「{fragrance.selected_name}」が完成しました！</p>
          <Link href="/AI-Blend/customize">
            <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              この香りでつくる
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}

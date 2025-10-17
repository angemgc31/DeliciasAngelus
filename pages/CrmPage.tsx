
import React, { useState, useRef, useEffect } from 'react';
import type { CrmMessage } from '../types';
import { getDessertRecommendation } from '../services/geminiService';
import { products } from '../data/products';

const CrmPage: React.FC = () => {
  const [messages, setMessages] = useState<CrmMessage[]>([
    { id: 1, text: '¡Hola! Soy tu asistente de postres. ¿En qué puedo ayudarte hoy? ¿O quizás buscas una recomendación?', sender: 'system' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: CrmMessage = { id: Date.now(), text: userInput, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const recommendation = await getDessertRecommendation(userInput, products);
      const aiMessage: CrmMessage = { id: Date.now() + 1, text: recommendation, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting recommendation:", error);
      const errorMessage: CrmMessage = { id: Date.now() + 1, text: 'Lo siento, tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getMessageStyle = (sender: CrmMessage['sender']) => {
    switch(sender) {
      case 'user':
        return 'bg-primary self-end';
      case 'ai':
        return 'bg-secondary/20 self-start';
      case 'system':
        return 'bg-yellow-100 text-yellow-800 self-center text-sm';
      default:
        return 'bg-gray-200 self-start';
    }
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-2xl mx-auto flex flex-col" style={{height: '70vh'}}>
      <h1 className="text-3xl font-bold text-secondary mb-4 border-b pb-2">Atención y Soporte</h1>
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/50 rounded-lg">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${getMessageStyle(msg.sender)}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe tu antojo..."
          className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !userInput.trim()}
          className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-500 transition-colors disabled:bg-gray-400"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CrmPage;

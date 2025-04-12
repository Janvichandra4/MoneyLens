
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Coach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your MoneyLens FinTwin. How can I help you with your finances today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Sample suggestions for common financial queries
  const suggestions = [
    "How much did I spend on food last month?",
    "Did my insurance premium change this year?",
    "Can I afford a vacation in May?",
    "How's my emergency fund looking?",
    "Summarize my investment performance"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate AI thinking and typing
    setIsAiTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsAiTyping(false);
    }, 1500);
  };

  const toggleMicrophone = () => {
    setIsListening(!isListening);
    // In a real implementation, this would connect to Web Speech API
    // or another speech recognition service
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  // Mock AI response generator - in a real app, this would call an AI service
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("spend") && lowerQuery.includes("food")) {
      return "Based on your uploaded statements, you spent $432.87 on food last month. That's about 15% of your total spending. Here's how it breaks down:\n\n🍽️ Restaurants: $285.50\n🛒 Groceries: $147.37\n\nThis is actually 8% less than your previous month. Keep it up!";
    } else if (lowerQuery.includes("insurance") && lowerQuery.includes("premium")) {
      return "I checked your insurance statements. Your home insurance premium increased by 3.5% this year ($24.45/month). However, your auto insurance remained the same at $112/month.";
    } else if (lowerQuery.includes("vacation") && lowerQuery.includes("afford")) {
      return "Looking at your savings rate and upcoming expenses, you could afford about $2,200 for a vacation in May without affecting your emergency fund. Would you like me to suggest a rough budget breakdown for your trip?";
    } else if (lowerQuery.includes("emergency fund")) {
      return "Your emergency fund currently stands at $8,750, which covers approximately 3.2 months of your essential expenses. The recommended target is 6 months. Would you like me to suggest a savings plan to reach this goal?";
    } else if (lowerQuery.includes("investment") || lowerQuery.includes("performance")) {
      return "Your investment portfolio grew by 8.2% this quarter, outperforming the market by 1.3%. Your tech stocks performed particularly well with a 12% return, while your bond yields were slightly down at -0.5%. Would you like me to show a detailed breakdown?";
    }
    
    return "That's a great question. Based on your financial data, I'd need to analyze this further. Would you like me to prepare a detailed report on this topic?";
  };

  return (
    <DashboardLayout title="Financial Coach" subtitle="Chat with your AI FinTwin for personalized financial insights">
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat interface */}
        <div className="flex-1 overflow-auto p-4 bg-gradient-to-b from-gray-50 to-blue-50 rounded-lg">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "flex gap-3 p-4 rounded-lg animate-fade-in",
                  message.sender === "user" 
                    ? "bg-blue-100 ml-auto max-w-[80%]" 
                    : "bg-white border border-gray-200 max-w-[80%]"
                )}
              >
                {message.sender === "ai" && (
                  <div className="flex-shrink-0">
                    <Avatar className="bg-gradient-to-br from-money-blue to-money-blue/80 text-white h-8 w-8">
                      <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <div className="text-sm">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="pb-1">{line}</p>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isAiTyping && (
              <div className="flex gap-3 p-4 bg-white border border-gray-200 rounded-lg max-w-[80%] animate-pulse">
                <Avatar className="bg-gradient-to-br from-money-blue to-money-blue/80 text-white h-8 w-8">
                  <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Suggestions */}
        <div className="py-3 px-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="text-xs whitespace-nowrap px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        
        {/* Input area */}
        <div className="p-3 border-t bg-white">
          <div className="max-w-4xl mx-auto flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full transition-colors",
                isListening ? "bg-red-100 text-red-600 animate-pulse" : ""
              )}
              onClick={toggleMicrophone}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Ask me anything about your finances..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                className="pr-10 py-6 rounded-full"
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-blue-50"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Coach;

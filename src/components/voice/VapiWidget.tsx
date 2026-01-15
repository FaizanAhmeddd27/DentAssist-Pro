"use client";

import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Send,
  User,
  Bot,
  Sparkles,
  AlertCircle,
  Loader2,
  MessageSquare
} from "lucide-react";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isFinal?: boolean;
}

export default function VapiWidget() {
  const vapiRef = useRef<Vapi | null>(null);
  const isInitialized = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [isCalling, setIsCalling] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [callDuration, setCallDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /* ---------------- INIT VAPI ONCE ---------------- */
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    if (!apiKey) {
      console.error(" Missing NEXT_PUBLIC_VAPI_API_KEY");
      setError("API key is missing");
      return;
    }

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setIsCalling(true);
      setIsConnecting(false);
      setError(null);
      
      setMessages([{
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: "Hi! I'm DentAssist Pro. How can I help you today?",
        timestamp: new Date(),
        isFinal: true
      }]);

      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    });

    vapi.on("call-end", () => {
      setIsCalling(false);
      setIsConnecting(false);
      setCallDuration(0);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-end-${Date.now()}`,
          role: "assistant",
          text: "Call ended. Thanks for talking with me!",
          timestamp: new Date(),
          isFinal: true
        }
      ]);
    });

    vapi.on("speech-start", () => {
      console.log(" User started speaking");
    });

    vapi.on("speech-end", () => {
      console.log("User stopped speaking");
    });

    vapi.on("volume-level", (level: number) => {
      setVolumeLevel(level);
    });

    vapi.on("message", (msg: any) => {

      if (msg?.type === "transcript") {
        const role: Role = msg.role === "assistant" ? "assistant" : "user";
        const text = msg.transcript?.trim();
        const isFinal = msg.transcriptType === "final";

        if (!text) return;

        setMessages((prev) => {
          const lastMessageIndex = [...prev].reverse().findIndex(m => m.role === role);
          const actualIndex = lastMessageIndex >= 0 ? prev.length - 1 - lastMessageIndex : -1;

          if (actualIndex >= 0) {
            const lastMessage = prev[actualIndex];
            const timeDiff = new Date().getTime() - lastMessage.timestamp.getTime();
            
            if (timeDiff < 2000) {
              const updated = [...prev];
              updated[actualIndex] = {
                ...lastMessage,
                text: text,
                timestamp: new Date(),
                isFinal: isFinal
              };
              return updated;
            }
          }

          if (isFinal) {
            return [
              ...prev,
              {
                id: `${role}-${Date.now()}`,
                role,
                text,
                timestamp: new Date(),
                isFinal: true
              }
            ];
          }

          return prev;
        });
      }
    });

    vapi.on("error", (error: any) => {
      console.error("Vapi error:", error);
      
      if (error?.message?.includes("Meeting has ended") || 
          error?.message?.includes("ejection")) {
        return;
      }
      
      setIsConnecting(false);
      setError(error.message || "An error occurred");
    });

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (e) {
          console.log("Error during cleanup:", e);
        }
      }
    };
  }, []);

  // Auto-scroll only if user isn't manually scrolling
  useEffect(() => {
    if (!isUserScrolling && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isUserScrolling]);

  // Detect user scrolling
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 50;
      setIsUserScrolling(!isAtBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const startCall = async () => {
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    
    if (!vapiRef.current) {
      setError("Vapi not initialized");
      return;
    }

    if (!assistantId) {
      setError("Assistant ID is missing");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await vapiRef.current.start(assistantId);
      
    } catch (err: any) {
      console.error(" Failed to start call:", err);
      setIsConnecting(false);
      
      if (err.name === "NotAllowedError") {
        setError("Microphone permission denied. Please allow microphone access.");
      } else {
        setError(err.message || "Failed to start call");
      }
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch (e) {
        console.log("Error stopping call:", e);
      }
    }
  };

  const toggleMute = () => {
    if (vapiRef.current && isCalling) {
      const newMutedState = !isMuted;
      vapiRef.current.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !vapiRef.current || !isCalling) return;

    const userMessage = input.trim();
    
    setMessages((prev) => [
      ...prev,
      { 
        id: `user-text-${Date.now()}`,
        role: "user", 
        text: userMessage, 
        timestamp: new Date(),
        isFinal: true
      },
    ]);

    try {
      vapiRef.current.send({
        type: "add-message",
        message: {
          role: "user",
          content: userMessage,
        },
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    setInput("");
    setIsUserScrolling(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-4 sm:mb-6 text-center px-2">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-primary">AI Voice Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              DentAssist Pro Voice
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Have a natural conversation with your AI dental assistant
          </p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 mx-2 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-xs sm:text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-3 sm:gap-4 md:gap-6">
          {/* Chat Section */}
          <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border rounded-xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col" 
               style={{ height: 'calc(100vh - 280px)', minHeight: '400px', maxHeight: '600px' }}>
            <div className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-border ${
              isCalling ? 'bg-gradient-to-r from-green-500/10 to-green-500/5' : 'bg-muted/30'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                    isCalling ? 'bg-green-500' : isConnecting ? 'bg-yellow-500 animate-pulse' : 'bg-muted-foreground'
                  }`} />
                  <p className="font-semibold text-xs sm:text-sm">
                    {isCalling ? 'Connected' : isConnecting ? 'Connecting...' : 'Not Connected'}
                  </p>
                </div>
                
                {isCalling && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-xs sm:text-sm font-mono text-muted-foreground">
                      {formatDuration(callDuration)}
                    </div>
                    
                    <div className="flex gap-0.5 items-end h-4 sm:h-5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 sm:w-1 rounded-full transition-all ${
                            volumeLevel > i * 20 ? 'bg-green-500' : 'bg-muted'
                          }`}
                          style={{ 
                            height: volumeLevel > i * 20 ? `${12 + (volumeLevel - i * 20) * 0.2}px` : '6px'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 mb-4 sm:mb-6">
                    <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No messages yet</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm max-w-sm">
                    Start a call to begin your conversation with the AI assistant
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user" 
                          ? "bg-gradient-to-br from-primary to-primary/80" 
                          : "bg-gradient-to-br from-muted to-muted/80"
                      }`}>
                        {msg.role === "user" ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />}
                      </div>
                      
                      <div className="max-w-[80%] sm:max-w-[75%]">
                        <div className={`rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-4 ${
                          msg.role === "user" 
                            ? "bg-gradient-to-br from-primary to-primary/90 text-white rounded-tr-md" 
                            : "bg-muted/80 rounded-tl-md"
                        } ${!msg.isFinal ? 'opacity-70' : ''}`}>
                          <p className="text-xs sm:text-sm leading-relaxed break-words">{msg.text}</p>
                          {!msg.isFinal && (
                            <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>typing...</span>
                            </div>
                          )}
                        </div>
                        <div className={`text-[10px] sm:text-xs text-muted-foreground mt-1 px-1 ${msg.role === "user" ? "text-right" : ""}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {isCalling && (
              <div className="p-3 sm:p-4 border-t border-border bg-muted/20">
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="w-full lg:w-80">
            <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-6">
              <div className="flex justify-center mb-4 sm:mb-6">
                <button
                  onClick={isCalling ? endCall : startCall}
                  disabled={isConnecting}
                  className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50 shadow-xl ${
                    isCalling 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30' 
                      : 'bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/30'
                  }`}
                >
                  {isConnecting ? (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 sm:border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isCalling ? (
                    <PhoneOff className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                  ) : (
                    <Phone className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                  )}
                  
                  {!isConnecting && <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />}
                </button>
              </div>

              <p className="text-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                {isCalling ? 'Click to end call' : isConnecting ? 'Connecting...' : 'Click to start call'}
              </p>

              {isCalling && (
                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={toggleMute}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all active:scale-95 ${
                      isMuted 
                        ? 'bg-red-500/10 border border-red-500/30 text-red-500' 
                        : 'bg-muted/50 border border-border hover:bg-muted'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">Microphone</span>
                    {isMuted ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>

                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all active:scale-95 ${
                      !isSpeakerOn 
                        ? 'bg-red-500/10 border border-red-500/30 text-red-500' 
                        : 'bg-muted/50 border border-border hover:bg-muted'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">Speaker</span>
                    {isSpeakerOn ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              )}

              {!isCalling && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/10 rounded-lg sm:rounded-xl border border-primary/20">
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center leading-relaxed">
                    Click the call button above to start a voice conversation with your AI dental assistant
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
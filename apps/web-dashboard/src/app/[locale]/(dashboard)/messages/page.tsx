"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Search,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  ArrowLeft,
  Building,
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import { fetchApi, API_BASE_URL } from "../../../../lib/api";
import { getStoredToken } from "../../../../lib/auth";
import { useAuthGuard } from "../../../../lib/useAuthGuard";
import { LuxuryCard, Button } from "@welqo/ui";

interface Message {
  id: string;
  conversationId: string;
  senderType: "OWNER" | "GUEST" | "SYSTEM";
  content: string;
  createdAt: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  guestEmail: string;
  property: { titleFr: string };
  lastMessageAt: string;
  messages: Message[];
}

export default function MessagesPage() {
  const router = useRouter();
  useAuthGuard();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  useEffect(() => {
    loadConversations();
    setupSocket();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeConvId) {
      loadMessages(activeConvId);
      socketRef.current?.emit("joinConversation", activeConvId);
    }
  }, [activeConvId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const setupSocket = () => {
    const token = getStoredToken();
    const socket = io(`${API_BASE_URL.replace("/v1", "")}/chat`, {
      auth: { token },
    });

    socket.on("newMessage", (msg: Message) => {
      if (msg.conversationId === activeConvId) {
        setMessages((prev) => [...prev, msg]);
      }
      // Update last message in list
      setConversations((prev) =>
        prev.map((c) =>
          c.id === msg.conversationId
            ? { ...c, lastMessageAt: msg.createdAt, messages: [msg] }
            : c
        ).sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
      );
    });

    socketRef.current = socket;
  };

  const loadConversations = async () => {
    try {
      const data = await fetchApi<Conversation[]>("/chat/conversations");
      setConversations(data);
      if (data.length > 0 && !activeConvId) {
        setActiveConvId(data[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (id: string) => {
    try {
      const data = await fetchApi<Message[]>(`/chat/conversations/${id}/messages`);
      setMessages(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConvId) return;

    socketRef.current?.emit("sendMessage", {
      conversationId: activeConvId,
      content: newMessage,
    });
    setNewMessage("");
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-welqo-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Sidebar - Conversation List */}
      <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Messages</h1>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-welqo-terracotta"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`w-full p-4 flex items-start gap-3 transition-colors border-b border-slate-50 dark:border-slate-800/50 ${
                activeConvId === conv.id
                  ? "bg-welqo-terracotta/5 dark:bg-welqo-terracotta/10"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-grow text-left overflow-hidden">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                    {conv.guestEmail.split('@')[0]}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {new Date(conv.lastMessageAt).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-[10px] text-welqo-terracotta font-medium mb-1 flex items-center gap-1">
                  <Building className="w-3 h-3" /> {conv.property.titleFr}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {conv.messages[0]?.content || "Aucun message"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-grow flex-col relative bg-slate-50 dark:bg-slate-950">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <header className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-welqo-terracotta/10 flex items-center justify-center text-welqo-terracotta">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{activeConv.guestEmail}</h3>
                  <p className="text-xs text-slate-500">En ligne</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </header>

            {/* Messages List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => {
                const isOwner = msg.senderType === "OWNER";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isOwner ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                        isOwner
                          ? "bg-welqo-anthracite text-white rounded-tr-none"
                          : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className={`flex items-center gap-1 mt-2 text-[9px] ${isOwner ? "text-slate-400" : "text-slate-500"}`}>
                        <Clock className="w-2.5 h-2.5" />
                        {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        {isOwner && (
                          <span className="ml-1">
                            {msg.isRead ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Check className="w-3 h-3" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="max-w-4xl mx-auto relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  placeholder="Écrivez votre message..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 pl-4 pr-16 text-sm resize-none focus:ring-1 focus:ring-welqo-terracotta min-h-[56px] max-h-32"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-welqo-terracotta text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-10">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
              <Send className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sélectionnez une conversation</h3>
            <p className="text-slate-500 max-w-xs">
              Choisissez un voyageur dans la liste de gauche pour démarrer la discussion.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Search, Check, CheckCheck, Home } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { fetchApi, API_BASE_URL } from "../../../../lib/api";
import { getStoredToken } from "../../../../lib/auth";
import { useAuthGuard } from "../../../../lib/useAuthGuard";

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

function formatTime(d: string) {
  const date = new Date(d);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  return isToday
    ? date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function guestInitials(email: string) {
  return email.split("@")[0].slice(0, 2).toUpperCase();
}

export default function MessagesPage() {
  useAuthGuard();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      setConversations((prev) =>
        prev
          .map((c) =>
            c.id === msg.conversationId
              ? { ...c, lastMessageAt: msg.createdAt, messages: [msg] }
              : c,
          )
          .sort(
            (a, b) =>
              new Date(b.lastMessageAt).getTime() -
              new Date(a.lastMessageAt).getTime(),
          ),
      );
    });
    socketRef.current = socket;
  };

  const loadConversations = async () => {
    try {
      const data = await fetchApi<Conversation[]>("/chat/conversations");
      setConversations(data);
      if (data.length > 0) setActiveConvId(data[0].id);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (id: string) => {
    try {
      const data = await fetchApi<Message[]>(
        `/chat/conversations/${id}/messages`,
      );
      setMessages(data);
    } catch {
      /* silent */
    }
  };

  const handleSend = () => {
    if (!newMessage.trim() || !activeConvId) return;
    socketRef.current?.emit("sendMessage", {
      conversationId: activeConvId,
      content: newMessage,
    });
    setNewMessage("");
    inputRef.current?.focus();
  };

  const selectConversation = (id: string) => {
    setActiveConvId(id);
    setShowMobileChat(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
          Messages
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {conversations.length} conversation
          {conversations.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="h-px bg-slate-100 dark:bg-slate-800/60" />

      {/* Chat layout */}
      <div
        className="flex rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
        style={{ height: "calc(100vh - 200px)", minHeight: "480px" }}
      >
        {/* Conversation list */}
        <div
          className={[
            "flex-col border-r border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900",
            "w-full md:w-72 md:flex",
            showMobileChat ? "hidden md:flex" : "flex",
          ].join(" ")}
        >
          {/* Search */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher…"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-md py-2 pl-8 pr-3 text-xs outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <p className="text-xs text-slate-400">Aucune conversation</p>
              </div>
            )}
            {conversations.map((conv) => {
              const isActive = activeConvId === conv.id;
              const lastMsg = conv.messages[0]?.content;
              return (
                <button
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={[
                    "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-b border-slate-100/60 dark:border-slate-800/40 last:border-0",
                    isActive
                      ? "bg-slate-50 dark:bg-slate-800/60"
                      : "hover:bg-slate-50/70 dark:hover:bg-slate-800/30",
                  ].join(" ")}
                >
                  {/* Avatar */}
                  <div
                    className={[
                      "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0",
                      isActive
                        ? "bg-primary text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
                    ].join(" ")}
                  >
                    {guestInitials(conv.guestEmail)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1 mb-0.5">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {conv.guestEmail.split("@")[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {formatTime(conv.lastMessageAt)}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-primary truncate mb-0.5">
                      {conv.property.titleFr}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {lastMsg || "Début de la conversation"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        <div
          className={[
            "flex-col flex-1 bg-slate-50/50 dark:bg-slate-950/20",
            showMobileChat ? "flex" : "hidden md:flex",
          ].join(" ")}
        >
          {activeConv ? (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between px-5 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  {/* Mobile back */}
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden p-1.5 -ml-1.5 rounded-md text-slate-400 hover:bg-slate-100 transition-colors"
                  >
                    ←
                  </button>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
                    {guestInitials(activeConv.guestEmail)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">
                      {activeConv.guestEmail.split("@")[0]}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Home className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-medium text-primary">
                        {activeConv.property.titleFr}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] text-slate-400">En ligne</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-xs text-slate-400">
                      Aucun message pour le moment
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => {
                  const isOwner = msg.senderType === "OWNER";
                  const isSystem = msg.senderType === "SYSTEM";
                  const prevMsg = messages[i - 1];
                  const grouped = prevMsg?.senderType === msg.senderType;

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="flex justify-center">
                        <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                          {msg.content}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <AnimatePresence key={msg.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                        className={[
                          "flex items-end gap-2",
                          isOwner ? "flex-row-reverse" : "flex-row",
                          grouped ? "mt-0.5" : "mt-3",
                        ].join(" ")}
                      >
                        {/* Avatar — only on first of a group */}
                        {!isOwner && (
                          <div
                            className={[
                              "w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-[9px] font-bold shrink-0",
                              grouped ? "opacity-0" : "",
                            ].join(" ")}
                          >
                            {guestInitials(activeConv.guestEmail)}
                          </div>
                        )}

                        <div
                          className={`max-w-[65%] flex flex-col gap-0.5 ${isOwner ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={[
                              "px-3.5 py-2 text-xs leading-relaxed",
                              isOwner
                                ? "bg-slate-900 dark:bg-slate-700 text-white rounded-2xl rounded-br-sm"
                                : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-sm",
                            ].join(" ")}
                          >
                            {msg.content}
                          </div>
                          <div
                            className={`flex items-center gap-1 text-[10px] text-slate-400 ${isOwner ? "flex-row-reverse" : ""}`}
                          >
                            <span>
                              {new Date(msg.createdAt).toLocaleTimeString(
                                "fr-FR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                            {isOwner &&
                              (msg.isRead ? (
                                <CheckCheck className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Check className="w-3 h-3" />
                              ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  );
                })}
                <div ref={scrollRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      e.target.style.height = "auto";
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 120) + "px";
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Votre message… (Entrée pour envoyer)"
                    rows={1}
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs resize-none focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all min-h-[40px] max-h-[120px] leading-relaxed"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center shrink-0 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 ml-0.5">
                  Maj + Entrée pour un saut de ligne
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-12">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white mb-1">
                Sélectionnez une conversation
              </p>
              <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                Choisissez un voyageur dans la liste pour commencer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

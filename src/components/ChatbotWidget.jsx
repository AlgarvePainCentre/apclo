import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getChatbotReply, getInitialChatbotMessage } from '../features/chatbot/chatbotEngine';
import './ChatbotWidget.css';

function createUserMessage(text) {
  return {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: 'user',
    text,
  };
}

function createBotMessage(payload) {
  return {
    id: `bot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: 'bot',
    ...payload,
  };
}

function MessageActions({ actions, onNavigate }) {
  if (!actions?.length) return null;

  return (
    <div className="chatbot-message-actions">
      {actions.map((action) =>
        action.kind === 'internal' ? (
          <Link key={`${action.label}-${action.to}`} to={action.to} className="chatbot-action-pill" onClick={onNavigate}>
            {action.label}
          </Link>
        ) : (
          <a
            key={`${action.label}-${action.href}`}
            href={action.href}
            className="chatbot-action-pill"
            target={action.href?.startsWith('http') ? '_blank' : undefined}
            rel={action.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={onNavigate}
          >
            {action.label}
          </a>
        ),
      )}
    </div>
  );
}

export default function ChatbotWidget() {
  const location = useLocation();
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const initialReply = useMemo(() => getInitialChatbotMessage(), []);
  const initialMessage = useMemo(() => createBotMessage(initialReply), [initialReply]);
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([initialMessage]);
  const [conversationContext, setConversationContext] = useState(initialReply.context);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  function resetConversation() {
    const welcomeReply = getInitialChatbotMessage();
    setMessages([createBotMessage(welcomeReply)]);
    setConversationContext(welcomeReply.context);
    setDraft('');
  }

  function submitPrompt(rawText) {
    const text = rawText.trim();
    if (!text) return;

    const userMessage = createUserMessage(text);
    const reply = getChatbotReply(text, conversationContext);
    const botMessage = createBotMessage(reply);
    setMessages((current) => [...current, userMessage, botMessage]);
    setConversationContext(reply.context);
    setDraft('');
  }

  function handleQuickReply(label) {
    submitPrompt(label);
  }

  const lastBotMessage = [...messages].reverse().find((message) => message.role === 'bot');

  return (
    <div className="chatbot-widget" aria-live="polite">
      <button
        type="button"
        className={isOpen ? 'chatbot-launcher is-hidden' : 'chatbot-launcher'}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <span className="chatbot-launcher-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 17.5c-1.7-1.4-2.75-3.42-2.75-5.75 0-4.42 3.92-8 8.75-8s8.75 3.58 8.75 8-3.92 8-8.75 8c-1.12 0-2.2-.19-3.18-.55L4 20.75l2-3.25Z" />
          </svg>
        </span>
        <span className="chatbot-launcher-label">Chat</span>
      </button>

      {isOpen ? (
        <section className="chatbot-panel" aria-label="Website assistant">
          <header className="chatbot-header">
            <div>
              <p className="chatbot-eyebrow">Algarve Pain Centre</p>
              <h2 className="chatbot-title">Website Assistant</h2>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat assistant"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </header>

          <div className="chatbot-toolbar">
            <button type="button" className="chatbot-reset" onClick={resetConversation}>
              New chat
            </button>
          </div>

          <div className="chatbot-messages" ref={messagesRef}>
            {messages.map((message) => (
              <article
                key={message.id}
                className={message.role === 'bot' ? 'chatbot-message chatbot-message-bot' : 'chatbot-message chatbot-message-user'}
              >
                <p className="chatbot-message-text">{message.text}</p>
                <MessageActions actions={message.actions} onNavigate={() => setIsOpen(false)} />
              </article>
            ))}
          </div>

          {lastBotMessage?.quickReplies?.length ? (
            <div className="chatbot-quick-replies" aria-label="Suggested prompts">
              {lastBotMessage.quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  className="chatbot-quick-reply"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="chatbot-form"
            onSubmit={(event) => {
              event.preventDefault();
              submitPrompt(draft);
            }}
          >
            <label className="sr-only" htmlFor="chatbot-input">
              Ask the website assistant
            </label>
            <input
              id="chatbot-input"
              ref={inputRef}
              className="chatbot-input"
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about treatments, specialities, or contact"
            />
            <button type="submit" className="chatbot-submit">
              Send
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}

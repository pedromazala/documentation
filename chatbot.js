import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { Cookies } from 'react-cookie';

// import './ChatWidget.css'; // Assuming you have a CSS file for styling
const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWidget = () => {
    console.log("Cookies")
    setIsOpen(!isOpen);
  };

  const {
    messages, input, handleInputChange, append, setInput

  } = useChat({ api: 'http://localhost:4646/api/chat/', streamProtocol: 'text' });
  const handleSubmit = (e) => {
    e.preventDefault();
    append({
      role: "user",
      content: input,
      // data: {
      //   ...{ cookies: document.cookie }
      // }
    });
    setInput("")
  };

  return (
    <div>
      <button
        onClick={toggleChatWidget}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '1001'
        }}
      >
        Chat
      </button>
      {isOpen && (
        <div
          id="chat-widget"
          style={{
            position: 'fixed',
            bottom: '60px',
            right: '20px',
            width: '300px',
            height: '400px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              margin: '0',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff'
            }}
          >
            Chat Widget
          </h1>
          <div style={{ flex: '1', overflowY: 'auto', padding: '10px' }}>
            {messages.length == 0 ? <h1 className='page-header'>What can I help with?</h1> : <></>}
            {messages.map((m, index) => (
              <div key={index} >
                {m.role === "user" ?
                  (<div className='user-message'>{m.content}</div>) :
                  <div className='assistant-message'>
                    <MarkdownRenderer content={m.content} />
                  </div>
                }
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', padding: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Message SupportBot..."
              style={{ flex: '1', marginRight: '10px' }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

// Create a container element
const chatWidgetContainer = document.createElement('div');
document.body.appendChild(chatWidgetContainer);
// Render the ChatWidget component into the container element using React 18's createRoot API
const root = createRoot(chatWidgetContainer);
root.render(<ChatWidget />);
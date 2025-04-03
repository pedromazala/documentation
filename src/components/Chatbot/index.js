import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import Cookies from 'js-cookie'
import { set } from 'zod';

const ProgressBar = () => {
    return (
        <div className='progress'>
            <h5>Gathering Sources...</h5>
            <LinearProgress color='inherit' />
        </div>
    );
}

const extractSources = (sources) => {
    sources = sources || [];
    return sources.map(source => {
        const docsIndex = source.source.indexOf('docs');
        let urlAfterDocs = docsIndex !== -1 ? source.source.substring(docsIndex) : source.source;
        urlAfterDocs = urlAfterDocs.replace(/\/(index|_index)?\.md$/, '');

        return {
            source: `/${urlAfterDocs}`, // Ensure it starts with a forward slash
            page_title: source.page_title
        };
    });
};

const MarkdownRenderer = ({ content }) => {
    let parsedResponse;
    try {
        parsedResponse = JSON.parse(content); // Attempt to parse the JSON string
    } catch (error) {
        console.error("Invalid JSON content:", error);
        parsedResponse = {}; // Fallback to an empty object if parsing fails
    }
    const final_output = parsedResponse.response ? parsedResponse.response : null;
    const answer = final_output ? final_output.answer : parsedResponse;
    const sources = final_output ? final_output.sources : null;
    const extractedSources = extractSources(sources);

    let sourceLinks = null;


    if (sources) {
        sourceLinks = extractedSources.map((source, index) => (
            <a className="source" key={index} href={`${source.source}`} target="_blank" rel="noopener noreferrer">
                <PlagiarismOutlinedIcon /> {source.page_title}
            </a>
        ));
    }

    return (
        <div>
            {answer &&
                <div>
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
                        {answer}
                    </ReactMarkdown>
                    {sourceLinks && sourceLinks.length > 0 ?
                        <div>
                            <hr />
                            <div>
                                <h5>Answer based on the following resources:</h5>
                                {sourceLinks}
                            </div>
                            <hr />
                        </div>
                        : <></>
                    }
                </div>}
        </div>)
};

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([]);

    const toggleChatWidget = () => {
        setIsOpen(!isOpen);
    };
    const chatWidgetRef = useRef(null);

    const examples = [
        'How do I start tracking events with Snowplow?',
        'What is the atomic table?',
        'What are Snowplow data products?',
    ];

    const {
        messages, input, handleInputChange, append, setInput, status

    } = useChat({ api: 'http://localhost:8000/api/chat/', streamProtocol: 'text' });

    useEffect(() => {
        if (messages[messages.length - 1]?.role === 'assistant') {
            const new_history = JSON.parse(messages[messages.length - 1].content).history
            if (new_history) {
                setHistory(new_history)
            }
        }
    }, [messages])


    const getCookie = (name) => {
        const cookieKeys = document.cookie
            .split(';')
            .reduce((ac, str) => [...ac, str?.split('=')[0].trim()], [])

        const sessionCookie = cookieKeys.filter((cookieKey) =>
            cookieKey.startsWith(name)
        )
        return sessionCookie.map(cookieKey => Cookies.get(cookieKey))
    }

    const submitMessage = (message) => {
        const cookies = getCookie('_sp_docs1_id')

        try {
            append({
                role: "user",
                content: message,
                data: {
                    ...(cookies ? { cookies: cookies[0] } : { cookies: 'None' }),
                    history: history
                }
            });
            setInput("");
        } catch (error) {
            console.error("Error submitting message:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submitMessage(input)
    };
    const handleExampleClick = (example) => {
        submitMessage(example)
    };

    return (
        <div className={isOpen ? 'open' : ''}>
            <button
                onClick={toggleChatWidget}
                className='chatbot-toggle-button'
            >
                <AutoAwesomeIcon />Ask AI
            </button>
            {isOpen && (
                <div ref={chatWidgetRef} className={`chat-widget ${isOpen ? 'fade-in' : ''}`}>
                    <div className='chat-header'>
                        <h1>Ask Snowplow AI</h1>
                        <button className='chatbot-toggle-close' onClick={toggleChatWidget}> <CloseIcon /> </button>
                    </div>
                    <div style={{ flex: '1', overflowY: 'auto', padding: '10px' }}>
                        {messages.length === 0 ?
                            <div className='examples'>
                                <h2>Examples</h2>
                                {examples.map((e, index) => (
                                    <div key={index} className='example' onClick={() => handleExampleClick(e)}>
                                        {e}
                                    </div>
                                ))}
                            </div>
                            : <></>}
                        {messages.map((m, index) => (
                            <div key={index} >
                                {m.role === "user" ?
                                    (<div className='message'>
                                        <div className='user-message'>
                                            {m.content.replace(/^"|"$/g, '')}
                                        </div>
                                    </div>) :
                                    <div className='message'>
                                        <div className='assistant-message'>
                                            <MarkdownRenderer content={m.content} />
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                        {status !== 'ready' && status !== 'error' && <ProgressBar />}
                        {status == 'error' && <div>Error fetching message</div>}
                    </div>
                    <form className='chat-input' onSubmit={handleSubmit} style={{ display: 'flex', padding: '10px' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask anything about Snowplow..."
                        />
                        <button className='submit-button' type="submit"><ArrowForwardIcon /></button>
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




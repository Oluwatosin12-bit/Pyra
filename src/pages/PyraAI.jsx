import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../components/PyraAI.css"; // Import the CSS file

const PyraAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);

  const API_KEY = "8194679b-c06c-4b1f-bf17-f17b99823166";
  const ASSISTANT_ID = "dcffac15-078f-48d8-bcc3-94e7e3fd1d9d";

  useEffect(() => {
    const createSession = async () => {
      try {
        const response = await axios.post("https://agentivehub.com/api/chat/session", {
          api_key: API_KEY,
          assistant_id: ASSISTANT_ID,
        });
        setSessionId(response.data.session_id);
      } catch (error) {
        console.error("Error creating session:", error);
      }
    };

    createSession();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    setLoading(true);
    setShowSuggestions(false); 

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("https://agentivehub.com/api/chat", {
        api_key: API_KEY,
        session_id: sessionId,
        assistant_id: ASSISTANT_ID,
        type: "custom_code",
        messages: [{ role: "user", content: input }],
      });

      if (response.data && response.data.content) {
        setMessages([...newMessages, { role: "ai", content: response.data.content }]);
      } else {
        setMessages([...newMessages, { role: "ai", content: "No response from AI." }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { role: "ai", content: "Oops! Something went wrong." }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">Pyra AI</div>

      {/* Suggestions Section */}
      {showSuggestions && (
        <>
          <div className="suggestions-title">
            <h1>How Can I Help You Today?</h1>
          </div>
          <div className="suggestions-container">
            <div className="suggestion-box" onClick={() => setInput("Check city growth trends")}>
                <p><b>Check city growth trends</b></p>
                <p>Find where city growth is</p>
            </div>
            <div className="suggestion-box" onClick={() => setInput("Find the latest developments")}>
                
                <p><b>Find the latest developments</b></p>
                <p>Find me all new developments within miles of your solution</p>
            </div>
            <div className="suggestion-box" onClick={() => setInput("Create project summaries")}>
                <p><b>Create project summaries</b></p>
                <p>Generate reports needed for a particular development</p>
            </div>
          </div>
        </>
      )}

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role}`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="message ai loading">
            <div className="loading-spinner">...</div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Chat Input and Send Button */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage} disabled={loading}>
          {loading ? <div className="loading-spinner">...</div> : <i className="send-icon">&#8594;</i>}
        </button>
      </div>
    </div>
  );
};

export default PyraAI;

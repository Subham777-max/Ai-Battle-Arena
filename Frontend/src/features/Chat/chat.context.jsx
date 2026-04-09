import { useState } from "react";
import { ChatContext } from "./context/Chatcontext";

function ChatProvider({ children }){
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    return (
        <ChatContext.Provider value={{ currentChat, setCurrentChat, chats, setChats, loading, setLoading }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;
import React, { useContext } from 'react'
import { ChatContext } from '../context/Chatcontext';
import { getAllResponses, invokeAI } from '../services/chat.service';

export function useChats() {
    const { currentChat, setCurrentChat, chats, setChats, loading, setLoading } = useContext(ChatContext);
    async function invokeChat(problem) {
        setLoading(true);
        setCurrentChat({
            problem,
            solution_1: "Generating solution 1...",
            solution_2: "Generating solution 2...",
            judgment: "Evaluating solutions..."
        })
        try{
            const res = await invokeAI(problem);
            setCurrentChat(res.data);
            setChats(prev => [res.data, ...prev]);
        }catch(err){
            console.error("Error invoking AI:", err);
            setCurrentChat(null);
        }finally{
            setLoading(false);
        }
    }

    async function fetchAllChats() {
        setLoading(true);
        try {
            const res = await getAllResponses();
            setChats(res.data);
        } catch (err) {
            console.error("Error fetching chat history:", err);
        } finally {
            setLoading(false);
        }
    }
    return { currentChat, setCurrentChat, chats, setChats, loading, invokeChat, fetchAllChats };
}

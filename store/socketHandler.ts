import { create } from 'zustand';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8000')

const useChatStore = create((set) => {
    socket.on('chat', (msg) => {
      set((state: any) => ({ messages: [...state.messages, msg] }));
    });
    return {
        messages: [],
        sendMessage: (msg: string) => socket.emit('chat message', msg),
        sendStatus: () => socket.emit("online")
    }
})

export default useChatStore
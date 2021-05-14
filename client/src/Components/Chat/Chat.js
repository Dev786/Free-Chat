import React from 'react';
import ContactChat from './ContactChat';
const DefaultChat = () => {
    return (
        <div>
            Contains default Chat
        </div>
    )
}

export const Chat = ({ contact }) => {
    return (
        <div>
            {
                contact ?
                    <ContactChat contact={contact}></ContactChat>
                    : <DefaultChat></DefaultChat>
            }
        </div>
    )
}
// frontend/src/components/ContactList.js
import React from 'react';

export const ContactList = ({ contacts, handleStartChat }) => (
    <div>
        <ul>
            {contacts.map((contact) => (
                <li key={contact}>
                    {contact}
                    <button
                        className="float-right"
                        onClick={() => handleStartChat(contact)}
                    >
                        Start Chat
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

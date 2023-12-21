import { createContext, useContext, useState, useEffect } from 'react';

const MessageContext = createContext();

export const useMessage = () => {
    return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
    

    return <MessageContext.Provider value={''}>{children}</MessageContext.Provider>;
};

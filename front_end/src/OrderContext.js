// OrderContext.js
import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orderCount, setOrderCount] = useState(0);

    const updateOrderCount = (newCount) => {
        setOrderCount(newCount);
    };

    return (
        <OrderContext.Provider value={{ orderCount, updateOrderCount }}>
            {children}
        </OrderContext.Provider>
    );
};

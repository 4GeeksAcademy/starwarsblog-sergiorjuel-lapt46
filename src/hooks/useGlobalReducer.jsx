// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"; // Import the reducer and the initial state.

// Create a context to hold the global state of the application.
// We'll call this global state the "store" to avoid confusion with local component state.
const StoreContext = createContext();

// Define a provider component that encapsulates the store and wraps it in a context provider.
// This makes the global state and dispatch function available to all components.
export function StoreProvider({ children }) {
    // Initialize the reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    // Provide the store and dispatch method to all child components.
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Custom hook to access the global state and dispatch function.

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useGlobalReducer must be used within a StoreProvider");
    }
    const { dispatch, store } = context;
    return { dispatch, store };
}

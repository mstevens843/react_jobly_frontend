import { useState } from "react";

/**
 * useLocalStorage hook to store a value in localStorage.
 * 
 * @param {string} key - The key to store the value under in localStorage.
 * @param {any} initialValue - The initial value to store.
 * @returns {Array} - An array containing the stored value and a function to update it.
 */
function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse and return the stored JSON or return the initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(`Error reading localStorage key “${key}”:`, err);
      return initialValue;
    }
  });

  /**
   * Update the localStorage value and state.
   * 
   * @param {any} value - New value to store in localStorage.
   */
  const setValue = (value) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting localStorage key “${key}”:`, err);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

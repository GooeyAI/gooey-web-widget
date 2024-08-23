import { useState, useEffect, useRef } from "react";

// Define the conversation schema
export interface Conversation {
  id?: number;
  title?: string;
  timestamp?: string;
  user_id?: string;
  messages?: any[]; // Array of messages
}

export const updateLocalUser = (userId: string) => {
  const ls = window.localStorage || null;
  if (!ls) return console.error("Local Storage not available");
  if (!localStorage.getItem("userId")) {
    localStorage.setItem("userId", userId);
  }
};

// Function to initialize IndexedDB
const initDB = (dbName: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("conversations", {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const useConversations = (
  dbName: string = "ConversationsDB",
  user_id: string
) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const dbRef = useRef<IDBDatabase | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      const database = await initDB(dbName);
      dbRef.current = database;
      await fetchConversations(); // Load existing conversations from DB
    };
    initializeDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // only run once
  }, []);

  const fetchConversations = async () => {
    if (dbRef.current) {
      const transaction = dbRef.current.transaction(
        ["conversations"],
        "readonly"
      );
      const objectStore = transaction.objectStore("conversations");
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const userConversations = request.result;
        // const userConversations = request.result.filter(
        //   (c: Conversation) => c.user_id === user_id
        // );
        setConversations(userConversations);
      };

      request.onerror = () => {
        console.error("Failed to fetch conversations:", request.error);
      };
    }
  };

  const handleAddConversation = async (c: Conversation | null) => {
    if (!c) return;
    const conversationId = c.id;
    console.log("Adding conversation:", c);
    if (dbRef.current) {
      const transaction = dbRef.current.transaction(
        ["conversations"],
        "readwrite"
      );
      const objectStore = transaction.objectStore("conversations");
      const request = objectStore.get(conversationId as number);

      request.onsuccess = async () => {
        const conversation = request.result || {};
        objectStore.put({ ...conversation, ...c } as Conversation); // Update the conversation in the database
        fetchConversations(); // Refresh the state from the database
      };

      request.onerror = (event) => {
        console.log(event);
        console.error("Failed to add conversation:", request.error);
      };
    }
  };

  return { conversations, handleAddConversation };
};

export default useConversations;

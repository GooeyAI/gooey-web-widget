import { useState, useEffect } from "react";

export interface Conversation {
  id?: string;
  title?: string;
  timestamp?: string;
  user_id?: string;
  messages?: any[]; // Array of messages
  getMessages?: () => Promise<any[]>;
}

export const USER_ID_LS_KEY = "user_id";

export const updateLocalUser = (userId: string) => {
  const ls = window.localStorage || null;
  if (!ls) return console.error("Local Storage not available");
  const currentUser = localStorage.getItem("user_id");
  if (!currentUser) {
    localStorage.setItem(USER_ID_LS_KEY, userId);
  }
};

const initDB = (dbName: string) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

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

const fetchConversation = (db: IDBDatabase, conversationId: string) => {
  return new Promise<Conversation>((resolve, reject) => {
    const transaction = db.transaction(["conversations"], "readonly");
    const objectStore = transaction.objectStore("conversations");
    const request = objectStore.get(conversationId);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const fetchAllConversations = (db: IDBDatabase, user_id: string) => {
  return new Promise<Conversation[]>((resolve, reject) => {
    const transaction = db.transaction(["conversations"], "readonly");
    const objectStore = transaction.objectStore("conversations");
    const request = objectStore.getAll();

    request.onsuccess = () => {
      const userConversations = request.result
        .map((conversation: Conversation) => {
          const conversationCopy = Object.assign({}, conversation);
          delete conversationCopy.messages; // reduce memory usage
          conversationCopy.getMessages = async () => {
            const _c = await fetchConversation(db, conversation.id as string);
            return _c.messages || [];
          };
          return conversationCopy;
        })
        .filter(
          (conversation: Conversation) => conversation.user_id === user_id
        );
      resolve(userConversations);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const addConversation = (db: IDBDatabase, conversation: Conversation) => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(["conversations"], "readwrite");
    const objectStore = transaction.objectStore("conversations");
    const request = objectStore.put(conversation);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const DB_NAME = "GOOEY_COPILOT_CONVERSATIONS_DB";
export const useConversations = (
  user_id: string
) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const loadConversations = async () => {
      const db = await initDB(DB_NAME);
      const userConversations = await fetchAllConversations(db, user_id);
      setConversations(
        userConversations.sort(
          (a: Conversation, b: Conversation) =>
            new Date(b.timestamp as string).getTime() -
            new Date(a.timestamp as string).getTime()
        )
      );
    };

    loadConversations();
  }, [user_id]);

  const handleAddConversation = async (c: Conversation | null) => {
    if (!c || !c.messages?.length) return;

    const db = await initDB(DB_NAME);
    await addConversation(db, c);
    const updatedConversations = await fetchAllConversations(db, user_id);
    setConversations(updatedConversations);
  };

  return { conversations, handleAddConversation };
};

export default useConversations;

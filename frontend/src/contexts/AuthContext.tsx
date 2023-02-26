import React, { createContext, ReactNode, useState, useEffect } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode | undefined;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface NotesProps {
  id?: string;
  text?: string;
  isCheck?: boolean;
  user_id?: string;
}

interface AuthContexDataProps {
  signed: boolean;
  user: UserProps;
  authLoading: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
  notes: NotesProps[];
  notesCount: number;
  notesCheckCount: number;
  getNotes: () => void;
  deleteNote: (data: NotesProps) => void;
  addNote: (note: string) => void;
  toggleCheckNote: (id: string, check: boolean) => Promise<boolean>;
  editNote: (id: string, text: string) => void;
}

export const AuthContext = createContext({} as AuthContexDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [notes, setNotes] = useState<NotesProps[]>();
  const [notesCount, setNotesCount] = useState(0);
  const [notesCheckCount, setNotesCheckCount] = useState(0);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("@myNotesUser");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function getNotes() {
    try {
      const response = await api.get("/note", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.data) {
        let data = response.data;

        let notesCheckCount = data.filter((item: NotesProps) => {
          return item.isCheck === true;
        });

        setNotes(data);
        setNotesCheckCount(notesCheckCount.length);
        setNotesCount(data.length - notesCheckCount.length);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote(data: NotesProps) {
    try {
      const response = await api.delete(`/note/${data.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.data) {
        const newListNotes = notes.filter((item: NotesProps) => {
          return item.id !== data.id;
        });

        if (data.isCheck === true) {
          setNotesCheckCount((value) => value - 1);
        } else {
          setNotesCount((value) => value - 1);
        }

        setNotes(newListNotes);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addNote(note: string) {
    try {
      const response = await api.post(
        "/note",
        {
          text: note,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.data) {
        setNotes((oldValue) => [...oldValue, response.data]);
        setNotesCount((value) => value + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleCheckNote(id: string, check: boolean): Promise<boolean> {
    try {
      const response = await api.put(
        `/note/${id}`,
        {
          isCheck: !check,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.data) {
        if (response.data.isCheck === true) {
          setNotesCheckCount((value) => value + 1);
          setNotesCount((value) => value - 1);
        } else {
          setNotesCheckCount((value) => value - 1);
          setNotesCount((value) => value + 1);
        }

        const updatedNotes = notes.map((note) => {
          if (note.id === id) {
            return { ...note, isCheck: !check };
          }
          return note;
        });

        setNotes(updatedNotes);

        return response.data.isCheck;
      }
    } catch (err) {
      console.log(err);
      return check;
    }
  }

  async function editNote(id: string, text: string) {
    try {
      console.log(text);

      const response = await api.put(
        `/note/${id}`,
        {
          text: text,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.data) {
        const updatedNotes = notes.map((note) => {
          if (note.id === id) {
            return { ...note, text: text };
          }
          return note;
        });

        setNotes(updatedNotes);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function signIn(email: string, password: string) {
    setAuthLoading(true);

    await api
      .post("/session", {
        email,
        password,
      })
      .then((response) => {
        const user = response.data;

        let data = {
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token,
        };

        storageUser(data);
        setUser(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setAuthLoading(false));
  }

  async function signUp(name: string, email: string, password: string) {
    setAuthLoading(true);

    await api
      .post("/users", {
        name,
        email,
        password,
      })
      .then((response) => {
        const user = response.data;

        let data = {
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token,
        };

        storageUser(data);
        setUser(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setAuthLoading(false));
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => setUser(null));
  }

  async function storageUser(data: UserProps) {
    await AsyncStorage.setItem("@myNotesUser", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        authLoading,
        loading,
        signIn,
        signUp,
        signOut,
        notes,
        notesCount,
        notesCheckCount,
        getNotes,
        deleteNote,
        addNote,
        toggleCheckNote,
        editNote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

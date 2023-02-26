import React, { useContext } from "react";

import { Container, Button } from "./styles";

import { Feather } from "@expo/vector-icons";
import { theme } from "../../styles/theme";
import { AuthContext, NotesProps } from "../../contexts/AuthContext";

interface SwipaebleProps {
  data: NotesProps;
  setOpenModal: (value: boolean) => void;
  setCurrentEditNote: (value: NotesProps) => void;
}

export function SwipaebleItems({
  data,
  setOpenModal,
  setCurrentEditNote,
}: SwipaebleProps) {
  const { deleteNote } = useContext(AuthContext);

  function handleDelete() {
    deleteNote(data);
  }

  function handleEdit() {
    setOpenModal(true);
    setCurrentEditNote(data);
  }

  return (
    <Container>
      <Button bgColor={theme.colors.Purple} onPress={handleEdit}>
        <Feather name="edit-3" size={24} color={theme.colors.Foreground} />
      </Button>

      <Button bgColor={theme.colors.Red} onPress={handleDelete}>
        <Feather name="trash" size={24} color={theme.colors.Foreground} />
      </Button>
    </Container>
  );
}

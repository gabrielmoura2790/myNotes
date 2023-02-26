import React, { useState, useContext } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext, NotesProps } from "../../contexts/AuthContext";
import api from "../../services/api";
import { theme } from "../../styles/theme";

import {
  Container,
  Background,
  ContainerModal,
  Title,
  Input,
  ButtonsContainer,
  Button,
  ButtonText,
} from "./styles";

interface ActivityModalProps {
  setOpenModal: (value: boolean) => void;
  modalVisible: boolean;
  currentEditNote: NotesProps;
  closeModelRef: () => void;
}

export function EditAcitivityModal({
  setOpenModal,
  modalVisible,
  currentEditNote,
  closeModelRef,
}: ActivityModalProps) {
  const { editNote } = useContext(AuthContext);
  const [note, setNote] = useState("");

  function handleEditNote() {
    if (note.length < 1) {
      alert(
        "Campo vazio ou inválido. Por favor preencha o campo com a atividade que deseja registrar!"
      );
      return;
    }
    editNote(currentEditNote.id, note);
    setNote("");
    setOpenModal(false);
    closeModelRef();
  }

  return (
    <Container animationType="fade" transparent={true} visible={modalVisible}>
      <Background onTouchStart={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "padding"}
        >
          <ContainerModal>
            <Title>Editar atividade</Title>

            <Input
              placeholder={currentEditNote?.text}
              placeholderTextColor={theme.colors.Comment}
              value={note}
              onChangeText={(text) => setNote(text)}
            />

            <ButtonsContainer>
              <Button onPress={() => [setOpenModal(false), closeModelRef()]}>
                <ButtonText style={{ color: theme.colors.Comment }}>
                  cancelar
                </ButtonText>
              </Button>
              <Button type={"add"} onPress={handleEditNote}>
                <ButtonText>Salvar</ButtonText>
              </Button>
            </ButtonsContainer>
          </ContainerModal>
        </KeyboardAvoidingView>
      </Background>
    </Container>
  );
}

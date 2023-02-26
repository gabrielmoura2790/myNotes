import React, { useState, useContext } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
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
}

export function AddActivityModal({
  setOpenModal,
  modalVisible,
}: ActivityModalProps) {
  const { user, addNote } = useContext(AuthContext);
  const [note, setNote] = useState("");

  function handleAddNote() {
    if (note.length < 1) {
      alert(
        "Campo vazio ou inválido. Por favor preencha o campo com a atividade que deseja registrar!"
      );
      return;
    }
    addNote(note);
    setNote("");
    setOpenModal(false);
  }

  return (
    <Container animationType="fade" transparent={true} visible={modalVisible}>
      <Background onTouchStart={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "padding"}
        >
          <ContainerModal>
            <Title>Adicionar atividade</Title>

            <Input
              placeholder="adicione sua atividade aqui..."
              placeholderTextColor={theme.colors.Comment}
              value={note}
              onChangeText={(text) => setNote(text)}
            />

            <ButtonsContainer>
              <Button onPress={() => setOpenModal(false)}>
                <ButtonText style={{ color: theme.colors.Comment }}>
                  cancelar
                </ButtonText>
              </Button>
              <Button type={"add"} onPress={handleAddNote}>
                <ButtonText>Adicionar</ButtonText>
              </Button>
            </ButtonsContainer>
          </ContainerModal>
        </KeyboardAvoidingView>
      </Background>
    </Container>
  );
}

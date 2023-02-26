import React, { useContext, useState, useLayoutEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { theme } from "../../styles/theme";

import {
  Container,
  Title,
  Header,
  TotalContainer,
  TotalText,
  TotalIndexContainer,
  ListContainer,
  List,
} from "./styles";

import { FabButton } from "../../components/FabButton";
import { NoteItem } from "../../components/NoteItem";
import { AddActivityModal } from "../../components/AddAcitivityModal";

export function Home() {
  const { notes, getNotes, notesCount, notesCheckCount } =
    useContext(AuthContext);

  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    getNotes();
  }, []);

  return (
    <Container>
      <Title style={{ color: theme.colors.Purple, alignSelf: "center" }}>
        my<Title style={{ color: theme.colors.Green }}>Notes</Title>
      </Title>

      <FabButton setOpenModal={setAddModalVisible} />

      <Header>
        <TotalContainer>
          <TotalText>Não concluidas:</TotalText>
          <TotalIndexContainer>
            <TotalText>{notesCount}</TotalText>
          </TotalIndexContainer>
        </TotalContainer>

        <TotalContainer>
          <TotalText>Concluidas:</TotalText>
          <TotalIndexContainer>
            <TotalText>{notesCheckCount}</TotalText>
          </TotalIndexContainer>
        </TotalContainer>
      </Header>

      <ListContainer>
        <List
          data={notes}
          renderItem={({ item }) => <NoteItem data={item} />}
        />
      </ListContainer>

      <AddActivityModal
        modalVisible={addModalVisible}
        setOpenModal={setAddModalVisible}
      />
    </Container>
  );
}

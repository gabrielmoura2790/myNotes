import React, { useContext, useState, useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Container, Title, CheckButton } from "./styles";

import { Feather } from "@expo/vector-icons";
import { theme } from "../../styles/theme";
import { SwipaebleItems } from "../SwipaebleItems";
import { AuthContext, NotesProps } from "../../contexts/AuthContext";
import { EditAcitivityModal } from "../EditAcitivityModal";

export interface NoteItemProps {
  data: NotesProps;
}

export function NoteItem({ data }: NoteItemProps) {
  const refSwipeable = useRef(null);

  const { toggleCheckNote } = useContext(AuthContext);
  const [isCheck, setIsCheck] = useState(data?.isCheck);

  async function handleToggleCheckNote() {
    const response = await toggleCheckNote(data.id, isCheck);
    setIsCheck(response);
  }

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentEditNote, setCurrentEditNote] = useState<NotesProps>();

  function handleCloseEditModal() {
    refSwipeable.current.close();
  }

  return (
    <Swipeable
      renderRightActions={() => (
        <SwipaebleItems
          data={data}
          setOpenModal={setEditModalVisible}
          setCurrentEditNote={setCurrentEditNote}
        />
      )}
      cancelsTouchesInView={true}
      ref={refSwipeable}
    >
      <Container>
        <CheckButton onPress={() => handleToggleCheckNote()} isCheck={isCheck}>
          {isCheck && (
            <Feather name="check" size={24} color={theme.colors.Foreground} />
          )}
        </CheckButton>

        <Title isCheck={isCheck}>{data.text}</Title>
      </Container>

      <EditAcitivityModal
        modalVisible={editModalVisible}
        setOpenModal={setEditModalVisible}
        currentEditNote={currentEditNote}
        closeModelRef={handleCloseEditModal}
      />
    </Swipeable>
  );
}

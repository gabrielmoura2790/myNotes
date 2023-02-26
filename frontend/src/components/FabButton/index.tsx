import React, { useState, useRef, useContext } from "react";
import { Animated } from "react-native";

import { Container, Button, PView, SView } from "./styles";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { theme } from "../../styles/theme";

import { AuthContext } from "../../contexts/AuthContext";

interface FabButtonProps {
  setOpenModal: (value: boolean) => void;
}

export function FabButton({ setOpenModal }: FabButtonProps) {
  const { signOut } = useContext(AuthContext);

  const animation = useRef(new Animated.Value(0)).current;

  const [open, setOpen] = useState<boolean>(false);

  function toggleMenu() {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 7,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  }

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const logoutStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60],
        }),
      },
    ],
  };

  const addNoteStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120],
        }),
      },
    ],
  };

  return (
    <Container>
      <Button onPress={() => [setOpenModal(true), toggleMenu()]}>
        <SView style={addNoteStyle}>
          <MaterialCommunityIcons
            name="note-edit-outline"
            size={24}
            color={theme.colors.Foreground}
          />
        </SView>
      </Button>

      <Button onPress={signOut}>
        <SView style={logoutStyle}>
          <Feather name="log-out" size={24} color={theme.colors.Foreground} />
        </SView>
      </Button>

      <Button onPress={toggleMenu}>
        <PView style={rotation}>
          <Feather name="plus" size={32} color={theme.colors.Foreground} />
        </PView>
      </Button>
    </Container>
  );
}

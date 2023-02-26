import React, { useState } from "react";
import { TextInputProps } from "react-native";

import { Container, Label, InputArea, InputText, Button } from "./styles";
import Icon from "@expo/vector-icons/Feather";
import { theme } from "../../styles/theme";

interface InputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

export function Input({ label, isPassword, ...rest }: InputProps) {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <Container>
      <Label>{label}</Label>

      <InputArea>
        <InputText
          placeholderTextColor={theme.colors.Current_Line}
          secureTextEntry={isPassword ? !seePassword : false}
          autoCapitalize={"none"}
          {...rest}
        />

        {isPassword && (
          <Button onPress={() => setSeePassword(!seePassword)}>
            <Icon
              name={seePassword ? "eye" : "eye-off"}
              color={theme.colors.Purple}
              size={24}
            />
          </Button>
        )}
      </InputArea>
    </Container>
  );
}

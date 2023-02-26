import React, { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { theme } from "../../styles/theme";
import { Input } from "../../components/Input";

import { Container, Title, Button, ButtonTitle, Loading } from "./styles";
import { AuthContext } from "../../contexts/AuthContext";

export function SignUp() {
  const { signUp, authLoading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    if (name === "" || email === "" || password === "")
      return alert("Preencha todos os campos!");

    signUp(name, email, password);
  }

  return (
    <Container onTouchStart={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "padding"}
      >
        <Title style={{ color: theme.colors.Purple, alignSelf: "center" }}>
          my<Title style={{ color: theme.colors.Green }}>Notes</Title>
        </Title>

        <Title style={{ color: theme.colors.Foreground }}>Cadastre-se</Title>

        <Input
          label="Nome"
          placeholder="Seu nome"
          value={name}
          onChangeText={(text) => setName(text)}
          autoCapitalize={"words"}
        />
        <Input
          label="E-mail"
          placeholder="email@email.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          label="Senha"
          placeholder="*******"
          isPassword
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input label="Confirmar senha" placeholder="*******" isPassword />

        <Button onPress={handleSignUp}>
          {authLoading ? (
            <Loading size={"small"} color={theme.colors.Foreground} />
          ) : (
            <ButtonTitle>Cadastre-se</ButtonTitle>
          )}
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
}

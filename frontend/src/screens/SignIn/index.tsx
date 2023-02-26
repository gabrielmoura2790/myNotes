import React, { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";
import { Input } from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";

import {
  Container,
  Title,
  Button,
  ButtonTitle,
  ButtonSignUp,
  ButtonSignUpText,
  Loading,
} from "./styles";

export function SignIn() {
  const navigation = useNavigation();

  const { signIn, authLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (email === "" || password === "") return alert("Preencha os campos!");

    setEmail("");
    setPassword("");
    signIn(email, password);
  }

  return (
    <Container onTouchStart={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="padding">
        <Title style={{ color: theme.colors.Purple, alignSelf: "center" }}>
          my<Title style={{ color: theme.colors.Green }}>Notes</Title>
        </Title>

        <Title style={{ color: theme.colors.Foreground }}>Login</Title>

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

        <Button onPress={handleSignIn}>
          {authLoading ? (
            <Loading size={"small"} color={theme.colors.Foreground} />
          ) : (
            <ButtonTitle>Entrar</ButtonTitle>
          )}
        </Button>

        <ButtonSignUp onPress={() => navigation.navigate("SignUp")}>
          <ButtonSignUpText style={{ color: theme.colors.Comment }}>
            Ainda não tem uma conta?{" "}
            <ButtonSignUpText
              style={{ color: theme.colors.Green, fontWeight: "bold" }}
            >
              Cadastre-se aqui
            </ButtonSignUpText>
          </ButtonSignUpText>
        </ButtonSignUp>
      </KeyboardAvoidingView>
    </Container>
  );
}

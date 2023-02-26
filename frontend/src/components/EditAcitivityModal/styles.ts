import styled from "styled-components/native";
import { theme } from "../../styles/theme";

interface ButtonProps {
  type?: string;
}

export const Container = styled.Modal``;

export const Background = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const ContainerModal = styled.View`
  height: 250px;
  width: 350px;
  border-radius: 8px;
  background-color: ${theme.colors.Current_Line};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.Purple};
  margin-bottom: 32px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: ${theme.colors.Comment};
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-radius: 8px;
  margin-bottom: 32px;
  color: ${theme.colors.Foreground};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  width: 45%;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ButtonProps) =>
    props.type === "add" ? theme.colors.Purple : theme.colors.Current_Line};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.Foreground};
  font-weight: bold;
  font-size: 16px;
`;

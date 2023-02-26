import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  margin-bottom: 8px;
  color: ${theme.colors.Foreground};
  font-size: 16px;
  font-weight: bold;
`;

export const InputArea = styled.View`
  border-width: 1px;
  border-radius: 8px;
  height: 50px;
  border-color: ${theme.colors.Purple};
  padding: 0 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InputText = styled.TextInput`
  color: ${theme.colors.Foreground};
  width: 85%;
  padding: 8px;
`;

export const Button = styled.TouchableOpacity``;

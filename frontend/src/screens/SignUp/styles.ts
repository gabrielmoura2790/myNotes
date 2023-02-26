import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.Background};
  padding: 24px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.Purple};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const ButtonTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.Foreground};
`;

export const Loading = styled.ActivityIndicator``;

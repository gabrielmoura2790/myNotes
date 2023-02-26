import styled from "styled-components/native";
import { theme } from "../../styles/theme";

interface Props {
  isCheck: boolean;
}

export const Container = styled.View`
  background-color: ${theme.colors.Current_Line};
  margin: 0 24px;
  margin-bottom: 24px;
  min-height: 60px;
  border-radius: 8px;
  align-items: center;
  padding: 8px 24px;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${(props: Props) =>
    props.isCheck ? theme.colors.Purple : theme.colors.Foreground};
  text-decoration: ${(props: Props) =>
    props.isCheck ? "line-through" : "none"};
  font-style: ${(props: Props) => (props.isCheck ? "italic" : "normal")};
  width: 90%;
`;

export const CheckButton = styled.TouchableOpacity`
  margin-right: 8px;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background-color: ${(props: Props) =>
    props.isCheck ? theme.colors.Purple : theme.colors.Comment};
  align-items: center;
  justify-content: center;
`;

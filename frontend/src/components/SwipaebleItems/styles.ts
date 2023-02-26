import styled from "styled-components/native";
import { theme } from "../../styles/theme";

interface Props {
  bgColor: string;
}

export const Container = styled.View`
  flex-direction: row;
  margin-right: 14px;
`;

export const Button = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  background-color: ${(props: Props) => props.bgColor};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 10px;
`;

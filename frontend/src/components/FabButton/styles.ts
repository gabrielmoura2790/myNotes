import { Animated } from "react-native";
import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const Container = styled.View`
  position: absolute;
  bottom: 60px;
  right: 30px;
  align-items: center;
  z-index: 100;
`;

export const Button = styled.TouchableWithoutFeedback``;

export const PView = styled(Animated.View)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.Purple};
`;

export const SView = styled(Animated.View)`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.Purple};
`;

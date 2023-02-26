import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.Background};
  align-items: center;
  justify-content: space-evenly;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 32px;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 24px;
  margin-bottom: 32px;
  justify-content: space-between;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TotalText = styled.Text`
  color: ${theme.colors.Foreground};
  font-weight: bold;
`;

export const TotalIndexContainer = styled.View`
  background-color: ${theme.colors.Purple};
  height: 20px;
  width: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const ListContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const List = styled.FlatList``;

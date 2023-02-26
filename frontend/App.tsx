import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";
import { theme } from "./src/styles/theme";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StatusBar
          style="light"
          translucent={false}
          backgroundColor={theme.colors.Background}
        />
        <Routes />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

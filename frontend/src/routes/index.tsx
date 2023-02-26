import React, { useContext } from "react";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { AuthContext } from "../contexts/AuthContext";

import { View, ActivityIndicator } from "react-native";
import { theme } from "../styles/theme";

export function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.Background,
        }}
      >
        <ActivityIndicator color={theme.colors.Purple} size={"large"} />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

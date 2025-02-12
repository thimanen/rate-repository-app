import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.AppBarBackground,
    height: 100,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
    marginRight: 10,
    gap: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab
        title="Repositories"
        style={{ left: 25}}
      />
    </View>
  );
};

export default AppBar;

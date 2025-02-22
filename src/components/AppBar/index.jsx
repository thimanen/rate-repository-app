import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "../Text";
import AppBarTab from "./AppBarTab";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.AppBarBackground,
    height: 100,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 5,
    marginRight: 5,
  },
  scrollView: {
    horizontal: "true",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab title="Repositories" toLink="/" style={{ marginLeft: 25 }} />
        <AppBarTab
          title="Sign in"
          toLink="/signin"
          style={{ marginLeft: 25 }}
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;

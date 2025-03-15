import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../../theme";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../graphql/queries";

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
  const getMe = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  if (getMe.loading) return null;

  const isSignedIn = getMe.data.me ? true : false;

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <AppBarTab title="Repositories" toLink="/" style={{ marginLeft: 25 }} />
        {!isSignedIn && (
          <AppBarTab
            title="Sign in"
            toLink="/signin"
            style={{ marginLeft: 25 }}
          />
        )}
        {isSignedIn && (
          <AppBarTab
            title="Create a review"
            toLink="/createreview"
            style={{ marginLeft: 25 }}
          />
        )}

        {isSignedIn && (
          <AppBarTab
            title="Sign out"
            toLink="/signout"
            style={{ marginLeft: 25 }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

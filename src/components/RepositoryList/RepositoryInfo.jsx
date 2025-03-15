import { StyleSheet, View } from "react-native";
import theme from "../../theme";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    marginBottom: 5,
    backgroundColor: theme.colors.repositoryMainBackground,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.flexContainer}>
      <RepositoryItem repo={repository} isGitHubButton={true} />
    </View>
  );
};

export default RepositoryInfo;

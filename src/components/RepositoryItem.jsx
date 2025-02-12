import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  repositoryBackgroundColor: {
    backgroundColor: theme.colors.repositoryBackground,
  },
});
const RepositoryItem = ({ repo }) => {
  return (
    <View style={styles.repositoryBackgroundColor}>
      <Text color="textPrimary">Full name: {repo.fullName}</Text>
      <Text color="textSecondary">Description: {repo.description}</Text>
      <Text color="textSecondary">Language: {repo.language}</Text>
      <Text color="textSecondary">Stars: {repo.stargazersCount}</Text>
      <Text color="textSecondary">Forks: {repo.forksCount}</Text>
      <Text color="textSecondary">Reviews: {repo.reviewCount}</Text>
      <Text color="textSecondary">Rating: {repo.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;

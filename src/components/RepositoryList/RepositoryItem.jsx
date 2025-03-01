import { View, StyleSheet, Image } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    backgroundColor: theme.colors.repositoryItemBackground,
    gap: 5,
    alignItems: "stretch",
  },
  flexDescriptionContainer: {
    display: "flex",
    backgroundColor: theme.colors.repositoryItemBackground,
    gap: 5,
    alignItems: "flex-start",
  },
  flexItemContainer: {
    display: "flex",
    gap: 20,
    backgroundColor: theme.colors.repositoryItemBackground,
    flexDirection: "row",
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

const convertNumber = (number) => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number;
};

const RepositoryItem = ({ repo }) => {
  return (
    <View testID="repositoryItem" style={styles.flexContainer}>
      <View style={styles.flexItemContainer}>
        <Image
          style={styles.avatarImage}
          source={{ uri: repo.ownerAvatarUrl }}
        />
        <View style={styles.flexDescriptionContainer}>
          <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
            {repo.fullName}
          </Text>
          <Text color="textSecondary">{repo.description}</Text>
          <Text color="textWhite" style={styles.language}>
            {repo.language}
          </Text>
        </View>
      </View>

      <View style={styles.flexItemContainer} {...{ justifyContent: "center" }}>
        <View style={styles.flexContainer} {...{ alignItems: "center" }}>
          <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
            {convertNumber(repo.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.flexContainer} {...{ alignItems: "center" }}>
          <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
            {convertNumber(repo.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.flexContainer} {...{ alignItems: "center" }}>
          <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
            {convertNumber(repo.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.flexContainer} {...{ alignItems: "center" }}>
          <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
            {convertNumber(repo.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

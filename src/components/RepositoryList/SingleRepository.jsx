import { FlatList, View, StyleSheet } from "react-native";
import format from "date-fns/format"
import RepositoryInfo from "./RepositoryInfo";
import Text from "../Text";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
  flexContainer: {
    display: "flex",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: theme.colors.repositoryMainBackground,
  },
  flexContainerReview: {
    display: "flex",
    backgroundColor: theme.colors.repositoryItemBackground,
    gap: 5,
    flexDirection: "row",
    marginTop: 5,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: theme.colors.primary,
  },
  ratingNumber: {
    color: theme.colors.primary,

    fontSize: theme.fontSizes.rating,
  },
  flexContainerData: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
    gap: 5,
    flexShrink: 1,
  },
});

export const ReviewItem = ({ review }) => {
  return (
    <View>
      <View style={styles.flexContainerReview}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingNumber}>{review.rating}</Text>
        </View>
        <View style={styles.flexContainerData}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{format(review.createdAt,"d.M.y")}</Text>
          <Text color="textPrimary">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = ({ repository }) => {
  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      style={styles.flexContainer}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;

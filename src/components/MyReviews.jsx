import { StyleSheet, View, FlatList } from "react-native";
import Text from "./Text";
import { ReviewItem } from "./RepositoryList/SingleRepository";
import useMyReview from "../hooks/useMyReview";
import theme from "../theme";

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
});
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { loading, error, data } = useMyReview();
  if (loading) return <Text>Loading....</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviewNodes = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <FlatList
        style={styles.flexContainer}
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default MyReviews;

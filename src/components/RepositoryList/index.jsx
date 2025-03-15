import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useParams, useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "../Text";
import theme from "../../theme";
import useRepositories from "../../hooks/useRepositories";
import useRepository from "../../hooks/useRepository";
import SingleRepository from "./SingleRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    display: "flex",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: theme.colors.repositoryMainBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  let navigate = useNavigate();
  return (
    <FlatList
      style={styles.flexContainer}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(item.id)}>
          <RepositoryItem repo={item} isGitHubButton={false} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const { repoId } = useParams();
  const { loading, error, data } = useRepository(repoId);

  if (!repoId) {
    return (
      <RepositoryListContainer repositories={repositories} repoId={repoId} />
    );
  } else {
    if (loading) return <Text>Loading....</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return <SingleRepository repository={data.repository} />;
  }
};

export default RepositoryList;

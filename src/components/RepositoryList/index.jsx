import { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useParams, useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import Text from "../Text";
import theme from "../../theme";
import useRepositories from "../../hooks/useRepositories";
import useRepository from "../../hooks/useRepository";
import SingleRepository from "./SingleRepository";
import { Menu, Provider } from "react-native-paper";

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

export const OrderSelector = ({ order, setOrder }) => {
  const options = [
    "Latest repositories",
    "Highest rated repositories",
    "Lowest rated repositories",
  ];
  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => setOrder(option)}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
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
      ListHeaderComponent={() => (
        <OrderSelector order={order} setOrder={setOrder} />
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const { repositories } = useRepositories(order);
  const { repoId } = useParams();
  const { loading, error, data } = useRepository(repoId);

  if (!repoId) {
    return (
      <RepositoryListContainer
        repositories={repositories}
        repoId={repoId}
        order={order}
        setOrder={setOrder}
      />
    );
  } else {
    if (loading) return <Text>Loading....</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return <SingleRepository repository={data.repository} />;
  }
};

export default RepositoryList;

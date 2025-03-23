import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
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
  textInput: {
    backgroundColor: theme.colors.repositoryItemBackground,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: theme.fontSizes.subheading,
    paddingLeft: 5,
    marginBottom: 5,
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.main,
    }),
  },
  selectList: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-around",
    backgroundColor: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const OrderSearchSelector = ({
  order,
  setOrder,
  instantSearchKeyword,
  setSearchKeyword,
}) => {
  const options = ["Latest", "Highest rated", "Lowest rated"];
  return (
    <View>
      <View style={styles.searchInput}>
        <TextInput
          style={styles.textInput}
          placeholder="search string"
          value={instantSearchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
        />
        <View style={styles.selectList}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={() => setOrder(option)}>
              <Text
                fontSize="subheading"
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor:
                    option == order ? theme.colors.primary : "white",
                  color: option == order ? theme.colors.textWhite : "black",
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  instantSearchKeyword,
  setSearchKeyword,
}) => {
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
        <OrderSearchSelector
          order={order}
          setOrder={setOrder}
          instantSearchKeyword={instantSearchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("Latest");
  const [instantSearchKeyword, setSearchKeyword] = useState("");
  const [debounceSearchKeyword] = useDebounce(instantSearchKeyword, 500);
  let searchKeyword = debounceSearchKeyword;
  const { repositories } = useRepositories({ order, searchKeyword });
  const { repoId } = useParams();
  const { loading, error, data } = useRepository(repoId);

  if (!repoId) {
    return (
      <RepositoryListContainer
        repositories={repositories}
        repoId={repoId}
        order={order}
        setOrder={setOrder}
        instantSearchKeyword={instantSearchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  } else {
    if (loading) return <Text>Loading....</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return <SingleRepository repository={data.repository} />;
  }
};

export default RepositoryList;

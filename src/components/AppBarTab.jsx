import { View, Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import theme from "../theme";

const AppBarTab = ({ title, toLink, ...props }) => {
  console.log("here we are:", title);
  return (
    <View>
      <Pressable>
        <Link to={toLink}>
          <Text
            color="AppBarText"
            fontSize="subheading"
            fontWeight="bold"
            {...props}
          >
            {title}
          </Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;

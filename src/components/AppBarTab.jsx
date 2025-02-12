import { View, Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ title, ...props }) => {
  return (
    <View>
      <Pressable>
        <Text color="AppBarText" fontSize="subheading" fontWeight="bold" {...props}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;

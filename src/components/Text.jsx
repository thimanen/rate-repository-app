import { Text as NativeText, StyleSheet, Platform } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.main,
    }),
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextWhite: {
    color: theme.colors.textWhite,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorAppBarText: {
    color: theme.colors.AppBarText,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "AppBarText" && styles.colorAppBarText,
    color === "textWhite" && styles.colorTextWhite,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;

import { Platform, StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from 'styles/theme';

const subHostStyles = StyleSheet.create({
  container: {
    margin: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.grey,
    backgroundColor: '#B9B9B910',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  searchingContainer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  contentContainer: {
    gap: 5,
  },
  inputContainer: {
    paddingRight: 20,
  },
  inputText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: Platform.select({
      android: 13 * 1.4,
    }),
    color: colors.white,
  } as TextStyle,
  searchContainer: {
    maxHeight: 110,
    margin: 0,
    borderWidth: 1,
    zIndex: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: colors.grey,
    backgroundColor: colors.background,
    paddingTop: 7,
    paddingHorizontal: 10,
  },
});

export default subHostStyles;

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
    borderBottomWidth: 0,
  },
  contentContainer: {
    gap: 5,
  },
  inputContainer: {
    padding: 0,
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
    maxHeight: 120,
    margin: 0,
    marginTop: -6,
    borderWidth: 1,
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

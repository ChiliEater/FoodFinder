import { useContext } from "react";
import { StyleSheet, TextInput } from "react-native";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";

const SearchBar = () => {
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const theme = useContext(ThemeContext);
    return (
        <TextInput
            placeholder={localizer.get("searchPlaceholder", language)}
            style={[theme.styles.primary, theme.styles.onPrimary, styles.bar]}
            placeholderTextColor={theme.styles.onPrimary.color}
        />
    )
}

const styles = StyleSheet.create({
    bar: {
        borderRadius: 90,
        paddingLeft: 20,
        paddingRight: 20,
        width: 'auto',
        flex: 9,
    }
});

export default SearchBar;
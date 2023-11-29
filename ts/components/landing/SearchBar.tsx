import { useContext } from "react";
import { StyleSheet, TextInput } from "react-native";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";
import { NavigationProp } from "@react-navigation/native";
import { Category } from "../../remote/Remote";
import { ResultsScreen } from "./BrowseContainer";
import { ProductQuery } from "./SearchResults";

type SearchBarProps = {
    navigation: NavigationProp<any, any>,
    categories: Category[],
}

const SearchBar = (props: SearchBarProps) => {
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const theme = useContext(ThemeContext);

    return (
        <TextInput
            placeholder={localizer.get("searchPlaceholder", language)}
            style={[theme.styles.primary, theme.styles.onPrimary, styles.bar]}
            placeholderTextColor={theme.styles.onPrimary.color}
            onSubmitEditing={(text) => {
                let str: string | undefined;
                if (text.nativeEvent.text !== '') {
                    str = text.nativeEvent.text;
                }
                const query: ProductQuery = {
                    categories: props.categories,
                    keyword: str,
                };
                props.navigation.navigate(ResultsScreen, query);
            }}
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
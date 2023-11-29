import { ScrollView, StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";
import { createContext, useContext } from "react";
import { LocalizerContext, LanguageContext, ThemeContext } from "../../App";
import FilterButton from "./FilterButton";

export const BrowseScreen = 'Browse';
export const FilterScreen = 'Filter';

const Browse = () => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);
    return (
        <ScrollView style={[styles.container, theme.styles.surface]}>
            <View style={styles.topBar}>
                <SearchBar />
                <FilterButton />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 6,
        alignItems: 'stretch',
        width: '100%',
        columnGap: 10,
        paddingLeft: 10,
        paddingRight: 10,
    }
});

export default Browse;
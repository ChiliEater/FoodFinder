import { ScrollView, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { LocalizerContext, LanguageContext, ThemeContext } from "../../App";

const Browse = () => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);
    return (
        <ScrollView style={[styles.container, theme.styles.surface]}>
            <SearchBar />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
    }
});

export default Browse;
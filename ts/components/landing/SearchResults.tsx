import { NavigationProp } from "@react-navigation/native"
import { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../../App";

type SearchResultsProps = {
    navigation: NavigationProp<any, any>,
    
}

const SearchResults = () => {
    const theme = useContext(ThemeContext);
    return (
        <ScrollView style={theme.styles.secondary}>

        </ScrollView>
    );
}

export default SearchResults;
import { NavigationProp, RouteProp } from "@react-navigation/native"
import { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../../App";
import { Category } from "../../remote/Remote";

type SearchResultsProps = {
    navigation: NavigationProp<any, any>,
    route: RouteProp<any>,
}

export type ProductQuery = {
    categories: Category[],
    keyword?: string,
}

const SearchResults = (props: SearchResultsProps) => {
    const theme = useContext(ThemeContext);
    console.log((props.route as RouteProp<{ params: ProductQuery }>).params);
    return (
        <ScrollView style={theme.styles.secondary}>

        </ScrollView>
    );
}

export default SearchResults;
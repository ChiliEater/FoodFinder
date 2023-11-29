import { NavigationProp, RouteProp } from "@react-navigation/native"
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";
import Remote, { Category, Product } from "../../remote/Remote";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SearchResultCell from "./SearchResultCell";

type SearchResultsProps = {
    navigation: NavigationProp<any, any>,
    route: RouteProp<any>,
}

export type ProductQuery = {
    categories: Category[],
    keyword?: string,
}

const SearchResults = (props: SearchResultsProps) => {
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const theme = useContext(ThemeContext);
    const route = props.route as RouteProp<{ params: ProductQuery }>;

    const [isLoading, setLoading] = useState(true);
    const [results, setResults] = useState<Product[]>([]);

    const getResults = async () => {
        let products: Product[] = [];
        if (route.params.categories.length === 0) {
            products = await Remote.searchProducts(undefined, route.params.keyword);
        } else {
            for (const category of route.params.categories) {
                const response = await Remote.searchProducts(category.id, route.params.keyword);
                products = products.concat(response);
            }
        }
        setResults(products);
        setLoading(false);
    };

    useEffect(() => {
        getResults();
    }, []);

    return (
        <ScrollView style={theme.styles.secondary}>
            <View style={styles.container}>
                <Text style={[theme.styles.onSecondary, styles.title]}>
                    {localizer.get("searchTitle", language)}
                </Text>
                {
                    isLoading || results.length === 0 ?
                        (<ActivityIndicator />)
                        : results.map(product => (
                            <SearchResultCell
                                product={product}
                                key={product.id}
                            />
                        ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        gap: 20,
    },
    title: {
        fontSize: 28,
    }
});

export default SearchResults;
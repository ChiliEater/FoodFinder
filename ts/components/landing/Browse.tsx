import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "./SearchBar";
import { createContext, useContext, useEffect, useState } from "react";
import { LocalizerContext, LanguageContext, ThemeContext } from "../../App";
import FilterButton from "./FilterButton";
import { NavigationProp } from "@react-navigation/native";
import CategoryCell from "./CategoryCell";
import Remote, { Category } from "../../remote/Remote";

type BrowseProps = {
    navigation: NavigationProp<any, any>,
}

export const BrowseScreen = 'Browse';
export const FilterScreen = 'Filter';

const Browse = (props: BrowseProps) => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Category[]>();

    const getCategories = async () => {
        const categories: Category[] = await Remote.getCategories();
        setData(categories);
        setLoading(false);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <ScrollView style={[styles.container, theme.styles.surface]}>
            <View style={styles.topBar}>
                <SearchBar />
                {
                    isLoading || !data ? (
                        <ActivityIndicator color={theme.styles.onSurface.color}/>
                    ) : (
                        <FilterButton 
                            navigation={props.navigation}
                            categories={data}
                        />
                    )
                }
            </View>
            <View style={styles.grid}>
                {
                    isLoading || !data ? (
                        <ActivityIndicator style={styles.indicator} />
                    ) : data.map(category => (
                        <CategoryCell
                            navigation={props.navigation}
                            category={category}
                            key={category.id}
                        />
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        rowGap: 10,
        gap: 20,
    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 6,
        alignItems: 'stretch',
        width: '100%',
        columnGap: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
        gap: 20,
        flexWrap: "wrap",
        justifyContent: 'space-around',
    },
    indicator: {
        alignSelf: 'center',
    }
});

export default Browse;
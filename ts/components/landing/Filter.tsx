import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";
import Remote, { Category } from "../../remote/Remote";
import Checklist from "../common/Checklist";
import { NavigationProp, Route, RouteProp, useRoute } from "@react-navigation/native";
import { FilterData } from "./FilterButton";

type FilterProps = {
    navigation: NavigationProp<any, any>,
};

const Filter = (props: FilterProps) => {
    const theme = useContext(ThemeContext);
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const route: RouteProp<{ params: FilterData }> = useRoute();
    const [checkedFilters, setFilters] = useState<boolean[]>([]);

    return (
        <ScrollView style={[theme.styles.primary]}>
            <View style={styles.container}>
                <Text style={[theme.styles.onPrimary, styles.title]}>
                    {localizer.get("filtersTitle", language)}
                </Text>
                <Checklist
                    checkedCallback={setFilters}
                >
                    {route.params.categories.map((category, i) => (
                        <Text
                            style={[theme.styles.onPrimaryContainer, { fontSize: 20 }]}
                            key={i}
                        >
                            {localizer.get(category.name, language)}
                        </Text>
                    ))}
                </Checklist>
                <Pressable 
                    onTouchEnd={props.navigation.goBack}
                    style={[theme.styles.primaryContainer, styles.submitButton]}
                >
                    <Text style={[theme.styles.onPrimaryContainer, styles.submitText]}>
                        {localizer.get("filterSubmit", language)}
                    </Text>
                </Pressable>
            </View >
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
    },

    submitButton: {
        borderRadius: 90,
        alignSelf: 'center',
        padding: 15,
        paddingHorizontal: 60,
    },
    submitText: {
        fontSize: 28,
        textAlign: 'center',
    }
});

export default Filter;
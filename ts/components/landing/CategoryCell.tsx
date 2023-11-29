import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Language } from "../../localization/Languages"
import { useContext } from "react";
import { LocalizerContext, LanguageContext, ThemeContext } from "../../App";
import Remote, { Category } from "../../remote/Remote";
import { NavigationProp } from "@react-navigation/native";
import { ResultsScreen } from "./BrowseContainer";
import { ProductQuery } from "./SearchResults";

type CategoryCellProps = {
    category: Category,
    navigation: NavigationProp<any,any>,
};

const CategoryCell = (props: CategoryCellProps) => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);
    return (
        <Pressable
            style={[theme.styles.primary, styles.container]}
            onTouchEnd={() => {
                const query: ProductQuery = {
                    categories: [props.category],
                }
                props.navigation.navigate(ResultsScreen, query);
            }}
        >
            <Image
                source={Remote.resolveImage(props.category.image)}
                style={styles.image}
            />
            <Text style={theme.styles.onPrimary}>
                {localizer.get(props.category.name, language)}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12,
    },

    image: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: 150,
        height: 100,
    }
});

export default CategoryCell;
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Language } from "../../localization/Languages"
import { useContext } from "react";
import { LocalizerContext, LanguageContext, ThemeContext } from "../../App";
import { Category } from "../../remote/Remote";
import { NavigationProp } from "@react-navigation/native";

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
        >
            <Text style={theme.styles.onPrimary}>
                {localizer.get(props.category.name, language)}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 90,
    }
});

export default CategoryCell;
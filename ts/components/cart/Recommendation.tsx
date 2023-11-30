import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Remote, { Product } from "../../remote/Remote";
import { NavigationProp } from "@react-navigation/native";
import { useContext } from "react";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";
import { ProductScreen } from "./CartContainer";
import { ProductPageData } from "../product/ProductPage";

type RecommendationProps = {
    product: Product,
    navigation: NavigationProp<any,any>,
};

const Recommendation = (props: RecommendationProps) => {
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const theme = useContext(ThemeContext);
    return (
        <Pressable 
            style={[theme.styles.primary, styles.container]}
            onTouchEnd={() => {
                const data: ProductPageData = {
                    product: props.product,
                };
                props.navigation.navigate(ProductScreen, data);
            }}
        >
            <Image
                source={Remote.resolveImage(props.product.images.split(',')[0])}
                style={styles.image}
            />
            <Text style={[theme.styles.onPrimary, styles.text]}>{props.product.name}</Text>
            <Text style={[theme.styles.onPrimary, styles.text]}>{props.product.price + ".-"}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10,
        gap: 10,
        borderRadius: 20,
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
    }
});

export default Recommendation;
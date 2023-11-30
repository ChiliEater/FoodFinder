import { Image, StyleSheet, Text, View } from "react-native";
import Remote, { Product } from "../../remote/Remote";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import CartButton from "./CartButton";
import BookmarkButton from "./BookmarkButton";

export type ProductPageData = {
    product: Product,
}

type ProductPageProp = {
    route: RouteProp<any>,
    navigation: NavigationProp<any, any>,
}

const ProductPage = (props: ProductPageProp) => {
    const route = props.route as RouteProp<{ params: ProductPageData }>;
    const theme = useContext(ThemeContext);
    const images = route.params.product.images.split(',').map(img => Remote.resolveImage(img));
    return (
        <ScrollView style={theme.styles.tertiary}>
            <View style={styles.container}>
                <Image
                    source={images[0] ?? Remote.resolveImage('img/error.jpg')}
                    style={styles.bigImage}
                />
                <Text style={[theme.styles.onTertiary, styles.price]}>{`${route.params.product.price}.-`}</Text>
                <Text style={[theme.styles.onTertiary, styles.name]}>{route.params.product.name}</Text>
                <Text style={[theme.styles.onTertiary, styles.address]}>{route.params.product.location}</Text>
                <Text style={[theme.styles.onTertiary, styles.address]}>{route.params.product.contact}</Text>
                <CartButton product={route.params.product}/>
                <BookmarkButton product={route.params.product}/>
                <View style={styles.imageGrid}>
                    {
                        images.slice(1).map((img, i) => (
                            <Image
                                source={img}
                                style={styles.smallImage}
                                key={i}
                            />
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        gap: 10,
    },
    bigImage: {
        width: '100%',
        height: 300,
        borderRadius: 20,
    },
    smallImage: {
        width: '40%',
        height: 150,
        borderRadius: 20,
    },
    price: {
        fontSize: 30,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 20,
    },
    imageGrid: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        rowGap: 20,
    }
});

export default ProductPage;
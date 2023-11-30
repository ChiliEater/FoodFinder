import { NavigationProp } from "@react-navigation/native";
import Remote, { Product } from "../../remote/Remote";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProductPageData } from "../product/ProductPage";
import { ProductScreen } from "./BookmarksContainer";

type BookmarkEntryProps = {
    remove: () => void,
    product: Product,
    navigation: NavigationProp<any, any>,
};

const BookmarkEntry = (props: BookmarkEntryProps) => {
    const theme = useContext(ThemeContext);
    const navigation = props.navigation;
    return (
        <View style={styles.container}>
                <Pressable
                    style={[theme.styles.primaryContainer, styles.product]}
                    onTouchEnd={() => {
                        const data: ProductPageData = {
                            id: props.product.id,
                            product: props.product,
                        };
                        console.log(navigation.getState().routeNames)
                        navigation.navigate(ProductScreen);
                    }}
                >
                    <Image
                        source={Remote.resolveImage(props.product.images.split(',')[0])}
                        style={styles.image}
                    />
                    <View>
                        <Text style={[theme.styles.onPrimaryContainer, styles.title]}>{props.product.name}</Text>
                        <Text style={[theme.styles.onPrimaryContainer, styles.price]}>{`${props.product.price}.-`}</Text>
                    </View>
                </Pressable>

                <Pressable
                    style={styles.delete}
                    onTouchEnd={props.remove}
                >
                    <Icon
                        name="delete"
                        style={theme.styles.onPrimary}
                        size={30}
                    />
                </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        flexDirection: 'row',
    },
    subcontainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'stretch',
    },
    product: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        borderRadius: 20,
        flexGrow: 1,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    title: {
        fontSize: 28,
    },
    price: {
        fontSize: 20,
    },
    delete: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

});

export default BookmarkEntry;
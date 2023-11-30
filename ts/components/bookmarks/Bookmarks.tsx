import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../App";
import Remote, { Product } from "../../remote/Remote";
import Settings from "../settings/Settings";
import { NavigationProp } from "@react-navigation/native";
import BookmarkEntry from "./BookmarkEntry";

type BookmarksProps = {
    navigation: NavigationProp<any,any>,
};

const Bookmarks = (props: BookmarksProps) => {
    const theme = useContext(ThemeContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [subscribed, setSubscription] = useState(false);

    if (!subscribed) {
        Settings.subscribeToBookmark("bookmarks", (n: number[]) => {
            setSubscription(true);
            setLoading(true);
            setBookmarks(n);
        });
    }

    const getProducts = async () => {
        setProducts(await Remote.getProducts(bookmarks));
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, [bookmarks]);

    return (
        <ScrollView style={theme.styles.primary}>
            <View style={styles.container}>
                {
                    isLoading ?
                        (
                            <ActivityIndicator color={theme.styles.onPrimary.color}/>
                        )
                    :
                        products.map((product, i) => (
                            <BookmarkEntry
                                navigation={props.navigation}
                                product={product}
                                remove={() => {
                                    let arr = bookmarks.slice();
                                    arr.splice(i, 1)
                                    Settings.setBookmarks(arr)}}
                                key={i}
                            />
                        ))
                }
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'stretch',
        padding: 20,
        gap: 20,
    }
});

export default Bookmarks;
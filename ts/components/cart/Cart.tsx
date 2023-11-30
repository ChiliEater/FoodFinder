import { NavigationProp } from "@react-navigation/native";
import { ReactNode, useContext, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";
import Remote, { Product } from "../../remote/Remote";
import Settings from "../settings/Settings";
import CartEntry from "./CartEntry";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Recommendation from "./Recommendation";
import Random from "../../random/Random";


type CartProps = {
    navigation: NavigationProp<any, any>,
};


const Cart = (props: CartProps) => {
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const theme = useContext(ThemeContext);

    const [subscribed, setSubscription] = useState(false);
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState<Map<number, Product>>(new Map());

    if (!subscribed) {
        Remote.addCartListener('cart', async () => {
            const user = await Settings.getUser();
            const items = await Remote.getCart(user);
            if (items.size > 0) {
                const recs = await Remote.searchProducts([...items.values()][Random.int(0, items.size - 1)].category)
                setRecommendations(recs);
            }
            setCartItems(items);
            setLoading(false);
        });
        setSubscription(true);
    }

    const toElement = () => {
        let elements: ReactNode[] = [];
        cartItems.forEach((product, id) => elements.push((
            <CartEntry
                navigation={props.navigation}
                product={product}
                key={id}
                remove={() => Remote.removeFromCart(id)}
            />
        )));
        return elements;
    }

    const calculatePrice = () => {
        let sum = 0;
        cartItems.forEach(product => {
            sum += product.price;
        });
        return sum;
    }


    return (
        <ScrollView style={theme.styles.surface}>
            <View style={styles.container}>
                {
                    isLoading ?
                        (<ActivityIndicator
                            color={theme.styles.onSurface.color}
                            size={"large"}
                        />)
                        : toElement()
                }
                <Text style={[theme.styles.onSurface, styles.total]}>
                    {`${localizer.get("total", language)}: ${calculatePrice()}.-`}
                </Text>
                <View style={styles.buttonBar}>
                    <Pressable
                        style={[theme.styles.error, styles.button]}
                        onTouchEnd={async () => Remote.clearCart(await Settings.getUser())}
                    >
                        <Icon
                            name="delete"
                            size={28}
                            style={theme.styles.onError}
                        />
                    </Pressable>

                    <Pressable style={[theme.styles.primary, styles.button, styles.buy]}>
                        <Icon
                            name="shopping-cart"
                            style={theme.styles.onPrimary}
                            size={28}
                        />
                        <Text style={[theme.styles.onPrimary, styles.buttonText]}>{localizer.get("buyNow", language)}</Text>
                    </Pressable>
                </View>

                <Text style={[theme.styles.onSurface, styles.recText]}>{localizer.get("recommendations", language)}</Text>
                <ScrollView
                    horizontal={true}
                >
                    <View
                        style={styles.recContainer}
                    >

                        {
                            isLoading ?
                                (<ActivityIndicator
                                    color={theme.styles.onSurface.color}
                                    size={"large"}
                                />)
                                : recommendations.map(product => (
                                    <Recommendation
                                        navigation={props.navigation}
                                        product={product}
                                        key={product.id}
                                    />
                                ))
                        }
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        gap: 30,
    },
    buttonBar: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    total: {
        fontSize: 40,
        alignSelf: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buy: {
        flexGrow: 1,
    },
    buttonText: {
        fontSize: 24,
    },
    recText: {
        fontSize: 24,
    },
    recContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    }
});

export default Cart;
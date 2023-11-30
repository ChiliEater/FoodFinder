import { Pressable, StyleSheet, Text } from "react-native";
import { LocalizerContext, LanguageContext, ThemeContext } from "../../App";
import { useContext } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Product } from "../../remote/Remote";

type CartButtonProps = {
    product: Product,
};

const CartButton = (props: CartButtonProps) => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);

    return (
        <Pressable
            style={[theme.styles.tertiaryContainer, styles.container]}
        >
            <Icon
                name="shopping-cart"
                style={[theme.styles.onTertiaryContainer, styles.text]}
            />
            <Text style={[theme.styles.onTertiaryContainer, styles.text]}>{localizer.get("addToCart", language)}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10,
        borderRadius: 20,
        alignSelf: 'center',
        width: '60%',
    },
    text: {
        fontSize: 20,
    }
});

export default CartButton;


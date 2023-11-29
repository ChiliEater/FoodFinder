import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Remote, { Product } from "../../remote/Remote";
import { useContext } from "react";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";

type SearchResultCellProps = {
    product: Product,
};

const SearchResultCell = (props: SearchResultCellProps) => {
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const theme = useContext(ThemeContext);

    return (
        <Pressable style={[theme.styles.secondaryContainer, styles.container]}>
            <Image
                source={Remote.resolveImage(props.product.images.split(',')[0])}
                style={styles.image}
            />
            <View>
                <Text style={[theme.styles.onSecondaryContainer, styles.name]}>{props.product.name}</Text>
                <Text style={[theme.styles.onSecondaryContainer, styles.price]}>{`${props.product.price}.-`}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        padding: 10,
        gap: 10,
    },
    subcontainer: {
        display: "flex",

    },
    image: {
        borderRadius: 20,
        width: 100,
        height: 100,
    },
    name: {
        fontSize: 26,
    },
    price: {
        fontSize: 20
    }
});

export default SearchResultCell;
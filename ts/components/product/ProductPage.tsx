import { Text, View } from "react-native";
import { Product } from "../../remote/Remote";
import { NavigationProp, RouteProp } from "@react-navigation/native";

export type ProductPageData = {
    id: number,
    product?: Product,
}

type ProductPageProp = {
    route: RouteProp<any>,
    navigation: NavigationProp<any,any>,
}

const ProductPage = (props: ProductPageProp) => {
    console.log(props.route.params);
    return (
        <View>
            <Text>1</Text>
        </View>
    );
};

export default ProductPage;
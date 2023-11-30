import { createStackNavigator } from "@react-navigation/stack";
import Cart from "./Cart";
import ProductPage from "../product/ProductPage";

const Stack = createStackNavigator();

export const CartScreen = "CartPage";
export const ProductScreen = "ProductPage";

const CartContainer = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={CartScreen}
                component={Cart}
            />
            <Stack.Screen
                name={ProductScreen}
                component={ProductPage}
            />
        </Stack.Navigator>
    )
};

export default CartContainer
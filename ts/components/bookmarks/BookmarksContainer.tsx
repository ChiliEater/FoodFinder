import { NavigationProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Bookmarks from "./Bookmarks";
import ProductPage from "../product/ProductPage";

type BookmarksContainerProps = {
    navigation: NavigationProp<any, any>,
};

const Stack = createStackNavigator();

export const BookmarksScreen = "Bookmarks";
export const ProductScreen = "ProductPage";

const BookmarksContainer = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={BookmarksScreen}
                component={Bookmarks}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ProductScreen}
                component={ProductPage}
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
};

export default BookmarksContainer;
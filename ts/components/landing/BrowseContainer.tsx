import { ReactNode, useContext } from "react";
import { Language } from "../../localization/Languages";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";
import SearchBar from "./SearchBar";
import { createStackNavigator } from "@react-navigation/stack";
import Browse from "./Browse";
import Filter from "./Filter";
import SearchResults from "./SearchResults";

const Stack = createStackNavigator();

export const ResultsScreen = "Results";
export const FilterScreen = "Filter";
export const BrowseScreen = "Browse";

const BrowseContainer = () => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={BrowseScreen}
                component={Browse}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={FilterScreen}
                component={Filter}
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name={ResultsScreen}
                component={SearchResults}
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({

});

export default BrowseContainer;
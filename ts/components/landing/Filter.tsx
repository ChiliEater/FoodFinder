import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { ThemeContext } from "../../App";

const Filter = () => {
    const theme = useContext(ThemeContext);

    return (
        <ScrollView style={theme.styles.primary}>
            <Text style={theme.styles.onPrimary}>Wow</Text>
        </ScrollView>
    );
}

export default Filter;
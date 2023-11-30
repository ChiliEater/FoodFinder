import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LocalizerContext, LanguageContext, ThemeContext } from "../../App";

const MapView = () => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);

    return (
        <ScrollView style={[theme.styles.surface]}>
            <View style={styles.container}>
                <Icon
                    name="construction"
                    style={theme.styles.onSurface}
                    size={40}
                />
                <Text style={[theme.styles.onSurface, styles.text]}>{localizer.get("construction", language)}</Text>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    text: {
        fontSize: 30,
    }
});

export default MapView;
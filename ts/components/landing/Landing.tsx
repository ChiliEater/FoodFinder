import { ReactNode, useContext } from "react";
import { Language } from "../../localization/Languages";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { LanguageContext, LocalizerContext } from "../../App";

const Landing = () => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    return (
        <ScrollView style={styles.container}>
            <Text>{localizer.get("test0", language)}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
    }
});

export default Landing;
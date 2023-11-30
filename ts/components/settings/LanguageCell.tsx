import { NavigationProp } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { Pressable, Text } from "react-native";
import { Language } from "../../localization/Languages";
import Settings from "./Settings";
import { StyleSheet } from "react-native";

type LanguageCellProps = {
    language: Language,
};

const LanguageCell = (props: LanguageCellProps) => {
    const theme = useContext(ThemeContext);
    return (
        <Pressable
            style={[theme.styles.primary, styles.container]}
            onTouchEnd={() => Settings.setLanguage(props.language)}
        >
            <Text style={[theme.styles.onPrimary, styles.text]}>
                {Language[props.language]}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
    }
});

export default LanguageCell;
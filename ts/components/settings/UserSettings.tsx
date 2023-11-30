import { ReactNode, useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LanguageContext, LocalizerContext, ThemeContext } from "../../App";
import { Themes } from "../../themes/Themes";
import ThemeCell from "./ThemeCell";
import { Language, LanguageMap } from "../../localization/Languages";
import LanguageCell from "./LanguageCell";

const UserSettings = () => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    const theme = useContext(ThemeContext);

    const getLanguages = () => {
        let elements: ReactNode[] = [];
        LanguageMap.forEach((lang, key) => {
            if (lang !== Language.Other) {
                elements.push((
                    <LanguageCell language={lang} key={key}/>
                ));
            }
        });
        return elements;
        
    }

    return (
        <ScrollView style={theme.styles.surface}>
            <View style={styles.container}>
                <Text style={[theme.styles.onSurface, styles.title]}>{localizer.get("language", language)}</Text>
                <View style={styles.languageContainer}>
                    {getLanguages()}
                </View>
                <Text style={[theme.styles.onSurface, styles.title]}>{localizer.get("theme", language)}</Text>
                <View style={styles.themeContainer}>
                {
                    Themes.map((theme, i) => (
                        <ThemeCell
                        theme={theme}
                        key={i}
                        />
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 24,
    },
    themeContainer: {
        display: 'flex',
        gap: 20,
        flexDirection: 'row',
    },
    languageContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    }
});

export default UserSettings;
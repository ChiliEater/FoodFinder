import { Pressable, StyleSheet, View } from "react-native";
import { Theme } from "../../themes/Themes";
import Settings from "./Settings";

type ThemeCellProps = {
    theme: Theme,
}

const ThemeCell = (props: ThemeCellProps) => {
    return (
        <Pressable
            style={[props.theme.styles.surface, props.theme.styles.outline, style.container]}
            onTouchEnd={() => Settings.setTheme(props.theme)}
        >
            <View style={[props.theme.styles.primary, style.minis]}></View>
            <View style={[props.theme.styles.secondary, style.minis]}></View>
            <View style={[props.theme.styles.tertiary, style.minis]}></View>
        </Pressable>
    );
};

const style = StyleSheet.create({
    container: {
        display: 'flex',
        borderRadius: 20,
        padding: 5,
        gap: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: 50,
        height: 50,
        borderWidth: 2,
    },
    minis: {
        borderRadius: 20,
        width: '40%',
        height: '40%',
    }
});

export default ThemeCell;
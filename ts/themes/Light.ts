import { StyleSheet } from "react-native";
import { Theme } from "./Themes";

class Light {
    private constructor() { }

    public static readonly theme: Theme = {
        isDark: false,
        styles: StyleSheet.create({
            surface: {
                backgroundColor: "#FEF7FF"
            },
            onSurface: {
                color: "#1D1B20"
            },
            surfaceTint: {
                color: "#6750A4"
            },

            outline: {
                borderColor: "#79747E"
            },

            primary: {
                backgroundColor: "#6750A4"
            },
            onPrimary: {
                color: "#FFFFFF"
            },
            primaryContainer: {
                backgroundColor: "#EADDFF"
            },
            onPrimaryContainer: {
                color: "#21005D"
            },

            secondary: {
                backgroundColor: "#625B71"
            },
            onSecondary: {
                color: "#FFFFFF"
            },
            secondaryContainer: {
                backgroundColor: "#E8DEF8"
            },
            onSecondaryContainer: {
                color: "#1D192B"
            },

            tertiary: {
                backgroundColor: "#7D5260"
            },
            onTertiary: {
                color: "#FFFFFF"
            },
            tertiaryContainer: {
                backgroundColor: "#FFD8E4"
            },
            onTertiaryContainer: {
                color: "#31111D"
            },

            error: {
                backgroundColor: "#B3261E"
            },
            onError: {
                color: "#FFFFFF"
            },
            errorContainer: {
                backgroundColor: "#F9DEDC"
            },
            onErrorContainer: {
                color: "#410E0B"
            },
        }),
    };
}

export default Light;
import { StyleSheet } from "react-native";
import { Theme } from "./Themes";

class Dark {
    private constructor() { }

    public static readonly theme: Theme = {
        isDark: true,
        styles: StyleSheet.create({
            surface: {
                backgroundColor: "#141218"
            },
            onSurface: {
                color: "#E6E0E9"
            },
            surfaceTint: {
                color: "#D0BCFF"
            },

            outline: {
                borderColor: "#938F99"
            },

            primary: {
                backgroundColor: "#D0BCFF"
            },
            onPrimary: {
                color: "#381E72"
            },
            primaryContainer: {
                backgroundColor: "#4F378B"
            },
            onPrimaryContainer: {
                color: "#EADDFF"
            },

            secondary: {
                backgroundColor: "#CCC2DC"
            },
            onSecondary: {
                color: "#332D41"
            },
            secondaryContainer: {
                backgroundColor: "#4A4458"
            },
            onSecondaryContainer: {
                color: "#E8DEF8"
            },

            tertiary: {
                backgroundColor: "#EFB8C8"
            },
            onTertiary: {
                color: "#492532"
            },
            tertiaryContainer: {
                backgroundColor: "#633B48"
            },
            onTertiaryContainer: {
                color: "#FFD8E4"
            },

            error: {
                backgroundColor: "#F2B8B5"
            },
            onError: {
                color: "#601410"
            },
            errorContainer: {
                backgroundColor: "#8C1D18"
            },
            onErrorContainer: {
                color: "#F9DEDC"
            },
        }),
    };
}
export default Dark;
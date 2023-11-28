import Dark from "./Dark"
import Light from "./Light"

export const Themes: Theme[] = [
    Dark.theme,
    Light.theme,
];

export type Theme = {
    isDark: boolean,
    styles: {
        surface: {
            backgroundColor: string
        },
        onSurface: {
            color: string
        },
        surfaceTint: {
            color: string
        },

        outline: {
            borderColor: string
        },

        primary: {
            backgroundColor: string
        },
        onPrimary: {
            color: string
        },
        primaryContainer: {
            backgroundColor: string
        },
        onPrimaryContainer: {
            color: string
        },

        secondary: {
            backgroundColor: string
        },
        onSecondary: {
            color: string
        },
        secondaryContainer: {
            backgroundColor: string
        },
        onSecondaryContainer: {
            color: string
        },

        tertiary: {
            backgroundColor: string
        },
        onTertiary: {
            color: string
        },
        tertiaryContainer: {
            backgroundColor: string
        },
        onTertiaryContainer: {
            color: string
        },

        error: {
            backgroundColor: string
        },
        onError: {
            color: string
        },
        errorContainer: {
            backgroundColor: string
        },
        onErrorContainer: {
            color: string
        },
    }
}

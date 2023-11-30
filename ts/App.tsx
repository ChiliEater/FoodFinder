/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StatusBar,
    StyleSheet,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import Localizer from './localization/Localizer';
import { Language } from './localization/Languages';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BrowseContainer from './components/landing/BrowseContainer';
import Bookmarks from './components/bookmarks/Bookmarks';
import MapView from './components/map/MapView';
import Cart from './components/cart/Cart';
import UserSettings from './components/settings/UserSettings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme, Themes } from './themes/Themes';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import BookmarksContainer from './components/bookmarks/BookmarksContainer';
import Settings from './components/settings/Settings';
import CartContainer from './components/cart/CartContainer';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

export const LocalizerContext = createContext(new Localizer(require("../res/strings.json")))
export const LanguageContext = createContext(Language.German);
export const ThemeContext = createContext(Themes[0]);
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms)); // Break in case of emergency


const Tab = createBottomTabNavigator();

type TabIconProps = { focused: boolean, color: string, size: number };

function App(): JSX.Element {
    const [language, setLanguage] = useState(Language.English);
    const [languageSubscribed, languageSubscribe] = useState(false);

    const [localizer, setLocalizer] = useState(new Localizer(require("../res/strings.json")));
    const [localizerSubscribed, localizerSubscribe] = useState(false);

    const [theme, setTheme] = useState<Theme>(Themes[0]);
    const [themeSubscribed, themeSubscribe] = useState(false);

    if (!themeSubscribed) {
        Settings.subscribeToTheme('app', t => setTheme(t));
        themeSubscribe(true);
    }

    if (!languageSubscribed) {
        Settings.subscribeToLanguage('app', l => setLanguage(l));
        languageSubscribe(true);
    }

    changeNavigationBarColor(theme.styles.surface.backgroundColor, !theme.isDark);

    //Settings.reset();

    return (
        <LocalizerContext.Provider value={localizer}>
            <LanguageContext.Provider value={language}>
                <ThemeContext.Provider value={theme}>

                    <NavigationContainer>
                        <StatusBar
                            barStyle={theme.isDark ? 'light-content' : 'dark-content'}
                            backgroundColor={theme.styles.surface.backgroundColor}

                        />
                        <Tab.Navigator
                            backBehavior='history'
                            screenOptions={{
                                tabBarStyle: [theme.styles.surface, { borderColor: theme.styles.surface.backgroundColor }],
                                headerStyle: theme.styles.surface,
                                headerTitleStyle: theme.styles.onSurface,
                                headerShadowVisible: false,
                                tabBarActiveTintColor: theme.styles.surfaceTint.color,
                                tabBarInactiveTintColor: theme.styles.onSurface.color,
                            }}
                        >
                            <Tab.Screen
                                name='Landing'
                                component={BrowseContainer}
                                options={{
                                    title: localizer.get("tabBrowse", language),
                                    tabBarLabel: localizer.get("tabBrowse", language),
                                    tabBarIcon: (props: TabIconProps) => (
                                        <Icon
                                            name='category'
                                            size={props.size}
                                            color={props.color}
                                        />
                                    ),
                                }}
                            />

                            <Tab.Screen
                                name='Map'
                                component={MapView}
                                options={{
                                    title: localizer.get("tabMap", language),
                                    tabBarLabel: localizer.get("tabMap", language),
                                    tabBarIcon: (props: TabIconProps) => (
                                        <Icon
                                            name='map'
                                            size={props.size}
                                            color={props.color}
                                        />
                                    ),
                                }}
                            />

                            <Tab.Screen
                                name='BookmarksContainer'
                                component={BookmarksContainer}
                                options={{
                                    title: localizer.get("tabBookmarks", language),
                                    tabBarLabel: localizer.get("tabBookmarks", language),
                                    tabBarIcon: (props: TabIconProps) => (
                                        <Icon
                                            name='bookmark'
                                            size={props.size}
                                            color={props.color}
                                        />
                                    ),
                                }}
                            />

                            <Tab.Screen
                                name='Settings'
                                component={UserSettings}
                                options={{
                                    title: localizer.get("tabSettings", language),
                                    tabBarLabel: localizer.get("tabSettings", language),
                                    tabBarIcon: (props: TabIconProps) => (
                                        <Icon
                                            name='settings'
                                            size={props.size}
                                            color={props.color}
                                        />
                                    ),
                                }}
                            />

                            <Tab.Screen
                                name='Cart'
                                component={CartContainer}
                                options={{
                                    title: localizer.get("tabCart", language),
                                    tabBarLabel: localizer.get("tabCart", language),
                                    tabBarIcon: (props: TabIconProps) => (
                                        <Icon
                                            name='shopping-cart'
                                            size={props.size}
                                            color={props.color}
                                        />
                                    ),
                                }}
                            />
                        </Tab.Navigator>
                    </NavigationContainer>
                </ThemeContext.Provider>
            </LanguageContext.Provider>
        </LocalizerContext.Provider>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;

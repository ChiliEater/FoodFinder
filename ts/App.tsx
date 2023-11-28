/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useContext } from 'react';
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
import Landing from './components/landing/Landing';
import Bookmarks from './components/bookmarks/Bookmarks';
import MapView from './components/map/MapView';
import Cart from './components/cart/Cart';
import UserSettings from './components/settings/UserSettings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Themes } from './themes/Themes';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

export const LocalizerContext = createContext(new Localizer(require("../res/strings.json")))
export const LanguageContext = createContext(Language.German);
export const ThemeContext = createContext(Themes[1]);

const Tab = createBottomTabNavigator();

type TabIconProps = { focused: boolean, color: string, size: number };

function App(): JSX.Element {
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const theme = useContext(ThemeContext);
    changeNavigationBarColor(theme.styles.surface.backgroundColor, !theme.isDark);

    return (
        <NavigationContainer>
            <StatusBar
                barStyle={theme.isDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.styles.surface.backgroundColor}
                
            />
            <Tab.Navigator
                backBehavior='history'
                screenOptions={{
                    tabBarStyle: [theme.styles.surface],
                    headerStyle: [{shadowOpacity: 0}],
                    tabBarActiveTintColor: theme.styles.surfaceTint.color,
                    tabBarInactiveTintColor: theme.styles.onSurface.color,
                }}
            >
                <Tab.Screen
                    name='Landing'
                    component={Landing}
                    options={{
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
                    name='Bookmarks'
                    component={Bookmarks}
                    options={{
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
                    component={Cart}
                    options={{
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

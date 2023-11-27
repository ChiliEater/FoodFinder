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

type SectionProps = PropsWithChildren<{
    title: string;
}>;

export const LocalizerContext = createContext(new Localizer(require("../res/strings.json")))
export const LanguageContext = createContext(Language.English);

const Tab = createBottomTabNavigator();

type TabIconProps = { focused: boolean, color: string, size: number };

function App(): JSX.Element {
    //const isDarkMode = useColorScheme() === 'dark';
    const isDarkMode = false;
    const language = useContext(LanguageContext);
    const localizer = useContext(LocalizerContext);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Tab.Navigator
                backBehavior='history'
            >
                <Tab.Screen
                    name='Landing'
                    component={Landing}
                    options={{
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

import { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../App';
import { Pressable, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FilterScreen } from './Browse';

type FilterButtonProps = {
    navigation: NavigationProp<any, any>,
}

const FilterButton = (props: FilterButtonProps) => {
    const theme = useContext(ThemeContext);
    return (
        <Pressable
            style={[styles.container]}
            onTouchEnd={() => {
                props.navigation.navigate(FilterScreen);
            }}
        >
            <Icon
                name='filter-list'
                style={[theme.styles.onSurface]}
                size={24}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 90,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default FilterButton;
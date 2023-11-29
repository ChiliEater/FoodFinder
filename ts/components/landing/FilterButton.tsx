import { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../App';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FilterScreen } from './Browse';

const FilterButton = () => {
    const theme = useContext(ThemeContext);
    const navigator = useNavigation();
    return (
        <Pressable
            style={[styles.container]}
            onTouchEnd={() => {
                navigator.navigate(FilterScreen as never);
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
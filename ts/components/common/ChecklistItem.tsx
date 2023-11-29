import { ReactNode, useState } from "react";
import { Pressable, StyleProp } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

type ChecklistItemProps = {
    children: ReactNode,
    style: StyleProp<any>,
    iconStyle: StyleProp<any>,
    checkedCallback: (c: boolean) => void,
}

const ChecklistItem = (props: ChecklistItemProps) => {
    const [checked, setChecked] = useState(false);

    return (
        <Pressable
            style={props.style}
            onTouchEnd={() => {
                setChecked(!checked);
                props.checkedCallback(!checked);
            }}
        >
            <Icon
                name="done"
                style={[props.iconStyle, { opacity: checked ? 1 : 0 }]}
                size={24}
            />
            {props.children}
        </Pressable>
    );
};

export default ChecklistItem;
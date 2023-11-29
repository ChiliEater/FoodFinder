import { ReactNode, useContext, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemeContext } from "../../App";
import ChecklistItem from "./ChecklistItem";

type ChecklistProps = {
    children: ReactNode[],
    checkedCallback: (c: boolean[]) => void,
};

const Checklist = (props: ChecklistProps) => {
    const theme = useContext(ThemeContext);
    const [checked, setChecked] = useState<boolean[]>(props.children.map(() => false));
    return (
        <View style={styles.container}>
            {props.children.map((child, i) => (
                <ChecklistItem
                    style={[theme.styles.primaryContainer, styles.subcontainer]}
                    checkedCallback={(check: boolean) => {
                        let checkedTemp = checked.slice();
                        checkedTemp[i] = check;
                        setChecked(checkedTemp);
                        props.checkedCallback(checkedTemp);
                    }}
                    iconStyle={theme.styles.onPrimaryContainer}
                    key={i}
                >
                    {child}
                </ChecklistItem>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 20,
    },
    subcontainer: {
        padding: 20,
        borderRadius: 20,
        gap: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default Checklist;
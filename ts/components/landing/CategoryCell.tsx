import { Text } from "react-native";
import { Language } from "../../localization/Languages"
import { localizer } from "../../App";

type CategoryCellProps = {
    language: Language,
};

const CategoryCell = (props: CategoryCellProps) => {
    return (
        <Text>
            {localizer.get("test1", props.language)}
        </Text>
    );
};

export default CategoryCell;
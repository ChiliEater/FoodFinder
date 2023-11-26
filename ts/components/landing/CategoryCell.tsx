import { Text } from "react-native";
import { Language } from "../../localization/Languages"
import { useContext } from "react";
import { LocalizerContext, LanguageContext } from "../../App";

type CategoryCellProps = {
    language: Language,
};

const CategoryCell = () => {
    const localizer = useContext(LocalizerContext);
    const language = useContext(LanguageContext);
    return (
        <Text>
            {localizer.get("test1", language)}
        </Text>
    );
};

export default CategoryCell;
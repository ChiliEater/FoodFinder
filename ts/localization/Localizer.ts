import { Language, LanguageMap } from "./Languages";
const table = require('../../res/strings.json');

type Localization = { [key: string]: { [key: string]: string } };

class Localizer {
    private strings: Map<string, Map<Language, string>>;

    constructor(localization: Localization) {
        this.strings = new Map(Object.keys(localization).map(
            key => [key, new Map(Object.keys(localization[key]).map(
                languageString => {
                    let language: Language = LanguageMap.get(languageString) ?? Language.Other;
                    return [language, localization[key][languageString]];
                }
            ))]));
    }

    public get(key: string, language: Language): string {
        let localization = this.strings.get(key);
        if (localization === undefined) {
            console.log(`No translations found for "${key}"`);
            return '$' + key;
        }
        let translation = localization.get(language);
        if (translation == undefined) {
            console.log(`No translation found for "${key}" in "${language}"`);
            return '$' + key;
        }
        return translation;
    }
}

export default Localizer;
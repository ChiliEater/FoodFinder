export enum Language {
    English = "english",
    German = "german",
    Other = "other",
}

export const LanguageMap: Map<string, Language> = new Map([
    ["english", Language.English],
    ["german", Language.German],
    ["other", Language.Other],
]);

export enum Language {
    English,
    German,
    Other}

export const LanguageMap: Map<string, Language> = new Map([
    ["english", Language.English],
    ["german", Language.German],
    ["other", Language.Other],
]);
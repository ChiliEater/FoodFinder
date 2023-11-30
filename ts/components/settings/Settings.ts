import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "../../localization/Languages";
import { Product } from "../../remote/Remote";
import { Theme, Themes } from "../../themes/Themes";
import Localizer from "../../localization/Localizer";

type SettingsData = {
    theme: number,
    language: Language,
    bookmarks: number[],
    user: number,
}

type BookmarkListenerCallback = (n: number[]) => void;
type ThemeListenerCallback = (t: Theme) => void;
type LanguageListenerCallback = (l: Language) => void;
type LocalizerListenerCallback = (l: Localizer) => void;

class Settings {
    private static Default: SettingsData = {
        theme: 0,
        language: Language.English,
        bookmarks: [4, 6, 3],
        user: 1,
    }
    private static readonly Key = 'settings';
    private static ChangeBookmarkListeners: Map<string, BookmarkListenerCallback> = new Map();
    private static ChangeThemeListeners: Map<string, ThemeListenerCallback> = new Map();
    private static ChangeLanguageListeners: Map<string, LanguageListenerCallback> = new Map();
    private static ChangeLocalizerListeners: Map<string, LocalizerListenerCallback> = new Map();


    private constructor() { }

    private static async getData(): Promise<SettingsData> {
        try {
            const data = await AsyncStorage.getItem(this.Key);
            if (data != null) {
                return JSON.parse(data);
            } else {
                this.setData(this.Default);
                return this.Default;
            }

        } catch (error) {
            console.log("Error reading data. Resetting...");
            this.setData(this.Default);
            return Promise.resolve(this.Default);
        }
    }

    private static async setData(data: SettingsData) {
        try {
            await AsyncStorage.setItem(this.Key, JSON.stringify(data));
        } catch (error) {
            console.log("Error writing data. Dumping config...");
            console.log(JSON.stringify(data));
        }
    }

    public static async reset() {
        this.setData(this.Default);
    }



    public static subscribeToBookmark(key: string, callback: BookmarkListenerCallback) {
        this.ChangeBookmarkListeners.set(key, callback);
        this.ChangeBookmarkListeners.forEach(async f => f(await this.getBookmarks()));
    }

    public static async getBookmarks(): Promise<number[]> {
        return (await this.getData()).bookmarks;
    }

    public static async setBookmarks(data: number[]) {
        let settings = await this.getData();
        settings.bookmarks = data;
        this.setData(settings);
        this.ChangeBookmarkListeners.forEach(f => f(data));
    }

    public static async addBookmark(data: number) {
        let settings = await this.getData();
        settings.bookmarks.push(data);
        settings.bookmarks = settings.bookmarks.filter((value, i, arr) => arr.indexOf(value) === i);
        this.setData(settings);
        this.ChangeBookmarkListeners.forEach(f => f(settings.bookmarks));
    }



    public static async subscribeToTheme(key: string, callback: ThemeListenerCallback) {
        this.ChangeThemeListeners.set(key, callback);
        const theme = await this.getTheme();
        this.ChangeThemeListeners.forEach(f => f(theme));
    }
    
    public static async getTheme(): Promise<Theme> {
        return Themes[(await this.getData()).theme];
    }
    
    public static async setTheme(data: Theme) {
        let settings = await this.getData();
        settings.theme = Themes.indexOf(data);
        this.setData(settings);
        this.ChangeThemeListeners.forEach(f => f(data));
    }
    

    
    public static async subscribeToLanguage(key: string, callback: LanguageListenerCallback) {
        this.ChangeLanguageListeners.set(key, callback);
        const language = await this.getLanguage();
        this.ChangeLanguageListeners.forEach(f => f(language));
    }
    
    public static async getLanguage(): Promise<Language> {
        return (await this.getData()).language;
    }
    
    public static async setLanguage(data: Language) {
        let settings = await this.getData();
        settings.language = data;
        this.setData(settings);
        this.ChangeLanguageListeners.forEach(f => f(data));
    }

    public static async getUser(): Promise<number> {
        return (await this.getData()).user;
    }

    public static async setUser(data: number) {
        let settings = await this.getData();
        settings.user = data;
        this.setData(settings);
    }
}

export default Settings;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "../../localization/Languages";
import { Product } from "../../remote/Remote";

type SettingsData = {
    theme: number,
    language: Language,
    bookmarks: number[],
}

type ListenerCallback = (n: number[]) => void;

class Settings {
    private static Default: SettingsData = {
        theme: 0,
        language: Language.English,
        bookmarks: [4,6,3],
    }
    private static readonly Key = 'settings';
    private static ChangeBookmarkListeners: Map<string, ListenerCallback> = new Map();


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

    public static subscribeToBookmark(key: string, callback: ListenerCallback) {
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

    public static async getTheme(): Promise<number> {
        return (await this.getData()).theme;
    }

    public static async setTheme(data: number) {
        let settings = await this.getData();
        settings.theme = data;
        this.setData(settings);
    }

    public static async getLanguage(): Promise<Language> {
        return (await this.getData()).language;
    }

    public static async setLanguage(data: Language) {
        let settings = await this.getData();
        settings.language = data;
        this.setData(settings);
    }
}

export default Settings;
import { ImageURISource } from "react-native";

export type Category = {
    id: number,
    name: string,
    image: string,
};

class Remote {
    private static host = "http://100.64.0.4:7777";
    
    private constructor() { }

    public static async getCategories() {
        try {
            const res = await fetch(`${this.host}/categories`);
            return res.json() as Promise<Category[]>;
        } catch (error) {
            console.log("oopsie");
        }
        return Promise.resolve([]);
    }

    public static resolveImage(relativePath: string): ImageURISource {
        return {uri: `${this.host}/${relativePath}`};
    }
}

export default Remote;
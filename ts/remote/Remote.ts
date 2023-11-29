import { ImageURISource } from "react-native";

export type Category = {
    id: number,
    name: string,
    image: string,
};

export type Product = {
    id: number,
    category: number,
    name: string,
    price: number,
    location: string,
    images: string,
}

class Remote {
    private static host = "http://100.64.0.4:7777";
    
    private constructor() { }

    public static async getCategories() {
        try {
            const res = await fetch(`${this.host}/categories`);
            return res.json() as Promise<Category[]>;
        } catch (error) {
            console.log("Error getting categories");
        }
        return Promise.resolve([]);
    }

    public static async searchProducts(category?: number, keyword?: string) {
        try {
            let url = `${this.host}/products?`;
            if (category) {
                url += `category=${category}&`;
            }
            
            if (keyword) {
                url += `name=${keyword}&`;
            }
            console.log(url);
            const res = await fetch(url);
            return res.json() as Promise<Product[]>;
        } catch (error) {
            console.log("Error getting products in category")
        }
        return Promise.resolve([]);
    }

    public static resolveImage(relativePath: string): ImageURISource {
        return {uri: `${this.host}/${relativePath}`};
    }
}

export default Remote;
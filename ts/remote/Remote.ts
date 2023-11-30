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
            const res = await fetch(url);
            return res.json() as Promise<Product[]>;
        } catch (error) {
            console.log("Error getting products in category")
        }
        return Promise.resolve([]);
    }

    public static async getProduct(product: number): Promise<Product> {
        try {
            const res = await fetch(`${this.host}/products/${product}`);
            return res.json() as Promise<Product>;
        } catch (error) {
            console.log("Error getting product")
        }
        return Promise.resolve({
            category: 0,
            id: 9999,
            images: 'img/error.jpg',
            location: 'ERR_NO_LOCATION',
            name: 'ERR_NO_NAME',
            price: 999999999,
        });
    }

    public static async getProducts(products: number[]): Promise<Product[]> {
        let arr = [];
        for (const product of products) {
            arr.push(await this.getProduct(product));
        }
        return arr;
    }

    public static resolveImage(relativePath: string): ImageURISource {
        return {uri: `${this.host}/${relativePath}`};
    }
}

export default Remote;
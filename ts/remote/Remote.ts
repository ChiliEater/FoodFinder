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
    contact: string,
};

export type CartItem = {
    id?: number,
    productId: number,
    userId: number,
};

export type CartListener = () => void

class Remote {
    private static host = "http://100.64.0.4:7777";

    private static cartListeners: Map<string, CartListener> = new Map();

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
        return [];
    }

    public static async getProduct(product: number): Promise<Product> {
        try {
            const res = await fetch(`${this.host}/products/${product}`);
            return res.json() as Promise<Product>;
        } catch (error) {
            console.log("Error getting product")
        }
        return {
            category: 0,
            id: 9999,
            images: 'img/error.jpg',
            location: 'ERR_NO_LOCATION',
            name: 'ERR_NO_NAME',
            contact: 'ERR_NO_CONTACT',
            price: 999999999,
        };
    }

    public static async getProducts(products: number[]): Promise<Product[]> {
        let arr = [];
        for (const product of products) {
            arr.push(await this.getProduct(product));
        }
        return arr;
    }

    public static addCartListener(key: string, callback: CartListener) {
        this.cartListeners.set(key, callback);
        this.cartListeners.forEach(f => f());
    }

    public static async addToCart(item: CartItem) {
        const res = await fetch(`${this.host}/carts`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(item),
        });
        if (res.status !== 200) {
            console.log("Error adding to cart");
            console.log(res);
        }
        this.cartListeners.forEach(f => f());
    }

    public static async removeFromCart(item: number) {
        const res = await fetch(`${this.host}/carts/${item}`, {
            method: "DELETE",
        });
        this.cartListeners.forEach(f => f());
    }

    public static async getCart(user: number): Promise<Map<number, Product>> {
        try {
            const res = await fetch(`${this.host}/carts?user=${user}`);
            const ids = await (res.json() as Promise<CartItem[]>);
            const items = await this.getProducts(ids.map(id => id.productId));
            return new Map(
                items.map((product, i) => {
                    return [ids[i].id as number, product];
                })
            );
        } catch (error) {
            console.log("Error getting cart");
        }
        return new Map();
    }

    public static async clearCart(user: number) {
        const cart = await this.getCart(user);
        for (const id of cart.keys()) {
            const res = await fetch(`${this.host}/carts/${id}`, {
                method: "DELETE",
            });
        }
        this.cartListeners.forEach(f => f());
    }

    public static resolveImage(relativePath: string): ImageURISource {
        return { uri: `${this.host}/${relativePath}` };
    }
}

export default Remote;
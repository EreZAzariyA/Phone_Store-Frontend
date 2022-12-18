abstract class Config {
      public urls = {
            auth: {
                  register: "",
                  login: ""
            },
            store: {
                  topThree: "",
                  topBrands: ""
            },
            phones: "",
            brands: "",
            shopping_carts: {
                  shopping_cart_by_userId: "",
                  items_in_cart: "",
                  add_item_to_cart: "",
                  update: "",
                  remove: ""
            },
            orders: {
                  newOrder: "",
                  getUsersOrders: "",
                  getGuestsOrder: ""
            }
      }

      public constructor(baseUrl: string) {
            this.urls = {
                  auth: {
                        register: baseUrl + "auth/register",
                        login: baseUrl + "auth/login"
                  },
                  store: {
                        topThree: baseUrl + "top-three",
                        topBrands: baseUrl + "top-brands"
                  },
                  phones: baseUrl + "phones/",
                  brands: baseUrl + "brands/",
                  shopping_carts: {
                        shopping_cart_by_userId: baseUrl + "shopping-carts/user-cart/",
                        items_in_cart: baseUrl + "shopping-carts/items-in-cart/",
                        add_item_to_cart: baseUrl + "shopping-carts/add-item-to-cart/",
                        update: baseUrl + "shopping-carts/update-item-in-cart/",
                        remove: baseUrl + "shopping-carts/delete-from-cart/"
                  },
                  orders: {
                        newOrder: baseUrl + "orders/",
                        getUsersOrders: baseUrl + "orders/users-orders/",
                        getGuestsOrder: baseUrl + "orders/guests-orders/"
                  }
            }
      }

}

class DevelopmentConfig extends Config {
      public constructor() {
            super("http://localhost:5001/api/");
      }
}

class ProductionConfig extends Config {
      public constructor() {
            super("https://7v7uwlv9pc.execute-api.eu-central-1.amazonaws.com/api/");
      }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
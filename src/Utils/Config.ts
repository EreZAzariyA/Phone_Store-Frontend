abstract class Config {
      public urls = {
            auth: {
                  register: "",
                  login: ""
            },
            store: {
                  phones: "",
                  onePhone: "",
                  brands: "",
                  phones_by_brands: "",
                  addBrand: ""
            },
            shopping_carts: {
                  shopping_cart_by_userId: "",
                  items_in_cart: "",
                  add_item_to_cart: "",
                  update: "",
                  remove: ""
            }
      }

      public constructor(baseUrl: string) {
            this.urls = {
                  auth: {
                        register: baseUrl + "auth/register",
                        login: baseUrl + "auth/login"
                  },
                  store: {
                        phones: baseUrl + "all-phones/",
                        onePhone: baseUrl + "all-phones/",
                        brands: baseUrl + "all-brands/",
                        phones_by_brands: baseUrl + "phones-by-brandId/",
                        addBrand: baseUrl + "add-brands/"
                  },
                  shopping_carts: {
                        shopping_cart_by_userId: baseUrl + "shopping-carts/user-cart/",
                        items_in_cart: baseUrl + "shopping-carts/items-in-cart/",
                        add_item_to_cart: baseUrl + "shopping-carts/add-item-to-cart/",
                        update: baseUrl + "shopping-carts/update-item-in-cart/",
                        remove: baseUrl + "shopping-carts/delete-from-cart/"
                  }
            }
      }

}

class DevelopmentConfig extends Config {
      public constructor() {
            super("https://7v7uwlv9pc.execute-api.eu-central-1.amazonaws.com/api/");
            //super("https://phone-store-beckend.herokuapp.com/api/")

      }
}

class ProductionConfig extends Config {
      public constructor() {
            super("https://7v7uwlv9pc.execute-api.eu-central-1.amazonaws.com/api/");
      }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
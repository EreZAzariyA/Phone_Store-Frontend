abstract class Config {
      public urls = {
            auth: {
                  register: "",
                  login: ""
            },
            store: {
                  phones: "",
                  brands: "",
                  phonesByBrands: ""
            },
            admin: {
                  addPhoneUrl: "",
                  addBrandUrl: ""
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
                        brands: baseUrl + "all-brands/",
                        phonesByBrands: baseUrl + "phones-by-brandId/"
                  },
                  admin: {
                        addPhoneUrl: baseUrl + "new-phone/",
                        addBrandUrl: baseUrl + "new-brand/",
                  }
            }
      }

}

class DevelopmentConfig extends Config {
      public constructor() {
            super("http://localhost:5000/api/")
            //super("https://phone-store-beckend.herokuapp.com/api/")

      }
}

class ProductionConfig extends Config {
      public constructor() {
            super("https://phone-store-beckend.herokuapp.com/api/")
      }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
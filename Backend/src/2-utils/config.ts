if(!process.env.NODE_ENV) process.env.NODE_ENV = "development";

class Config {
    public isDevelopment = process.env.NODE_ENV === "development";
    public isProduction = process.env.NODE_ENV === "production";
    public port = 0;
    public sqlHost = "";
    public sqlUser = "";
    public sqlPassword = "";
    public sqlDatabase = "";
}

class DevelopmentConfig extends Config {
    public port = 3002;
    public sqlHost = "localhost";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "shopping_online"; // Database Name
}

class ProductionConfig extends Config {
    public port = +process.env.PORT;
    public sqlHost = "eu-cdbr-west-03.cleardb.net";
    public sqlUser = "baed411f788968";
    public sqlPassword = "e9e57891";
    public sqlDatabase = "heroku_6baa45eba04b268";
}

// Connection String:
// mysql://user:password@host/database?reconnect=true
//  mysql://baed411f788968:e9e57891@eu-cdbr-west-03.cleardb.net/heroku_6baa45eba04b268?reconnect=true

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;

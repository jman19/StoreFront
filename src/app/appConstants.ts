export class AppConstants{
    public static jwtCookieName: string="ShopJwt";
    public static signInPath: string= "signIn";
    public static signUpPath: string= "signUp";
    public static storePath: string= "store";
    public static checkOutPath: string="checkOut";
    public static clientOrderHistory: string="orderHistory"
    public static billingFormPath: string="billingEdit"
    public static provincesList:string[]=["Alberta",
                      "British Columbia",
                      "Manitoba",
                      "New Brunswick",
                      "Newfoundland and Labrador",
                      "Northwest Territories",
                      "Nova Scotia",
                      "Nunavut",
                      "Ontario",
                      "Prince Edward Island",
                      "Quebec",
                      "Saskatchewan",
                      "Yukon"];
    public static months:string[]=["01","02","03","04","05","06","07","08","09","10","11","12"];
}
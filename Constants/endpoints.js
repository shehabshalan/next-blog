export class Endpoints {
  static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337/api/"
      : "https://reactblog-strapi.herokuapp.com/api/";
  static getBlogs = Endpoints.baseUrl + "blogs";
  static getBlogById = Endpoints.baseUrl + "blogs";
  static getToken =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_BEARER_TOKEN_DEV
      : process.env.NEXT_PUBLIC_BEARER_TOKEN_PROD;
}

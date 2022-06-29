export class Endpoints {
  static baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337/api/"
      : "https://reactblog-strapi.herokuapp.com/api/";
  static getBlogs = Endpoints.baseUrl + "blogs";
  static getBlogById = Endpoints.baseUrl + "blogs";
  static deleteBlog = Endpoints.baseUrl + "blogs";
  static updateBlog = Endpoints.baseUrl + "blogs";
  static login = Endpoints.baseUrl + "auth/local";
  static register = Endpoints.baseUrl + "auth/local/register";
  static getToken =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_BEARER_TOKEN_DEV
      : process.env.NEXT_PUBLIC_BEARER_TOKEN_PROD;
}

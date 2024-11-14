import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

const API_KEY =
  "cf6fea057418accfbe588f223007bd786de9c42a6f55d987e4e167382074f748feb22209bf200239e6ad5c4e3e10c24aafa73cc78915bb327e68da3139507772dae880bd73ef5d33e0688229bf9d7f5fcfb8ae645ccc004ab1770142d6cd27c056e5b006e46f816e67c74ad2a82e9f51e05d1f0a690df7670340ab5e60f78409";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

export const getVideos = () => axiosInstance.get("/reelvideos?populate=*");
export const postVideos = (data) =>
  axiosInstance.post("/post-videos?populate=*", data);

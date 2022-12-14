import axios, { AxiosRequestConfig } from "axios";
import rateLimit from "axios-rate-limit";

export const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1500 });

type ApiConfigFunction = (server: "coinGecko" | "etherscan" | "alternative.me" | "blockchain") => AxiosRequestConfig;

export const API_CONFIG: ApiConfigFunction = (server: "coinGecko" | "etherscan" | "alternative.me" | "blockchain") => {
  switch (server) {
    case "coinGecko":
      return {
        baseURL: "https://api.coingecko.com/api/v3",
        responseType: "json",
        method: "GET",
        headers: {
          "X-XSS-Protection": "1; mode=block",
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
          "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
          "Access-Control-Allow-Origin": "*",
        },
      };
    case "etherscan":
      return {
        baseURL: "https://api.etherscan.io",
        responseType: "json",
        method: "GET",
      };

    case "alternative.me":
      return {
        baseURL: " https://api.alternative.me",
        responseType: "json",
        method: "GET",
      };
    case "blockchain":
      return {
        baseURL: "https://api.blockchain.info",
        responseType: "json",
        method: "GET",
        headers: {
          "X-XSS-Protection": "1; mode=block",
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
          "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        },
      };
  }
};

export const drawerWidth = 260;
export const appBarHeight = 88;

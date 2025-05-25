import axios from "axios";

declare module "axios" {
  export interface AxiosInstance {
    setAccessToken(token: string): void;
  }
}

const $api = axios.create({
baseURL: "http://localhost:3000/api",
headers: { "Content-Type": "application/json" },
withCredentials: true,
});

let accessToken = "";

$api.setAccessToken = function (token: string) {
accessToken = token;
};

$api.interceptors.request.use((config) => {
if (!config.headers.Authorization) {
config.headers.Authorization = `Bearer ${accessToken}`;
}
return config;
});

$api.interceptors.response.use(
(response) => {
return response;
},
async (error) => {
const prevRequest = error.config;
const status = error.response?.status;

if (status === 401 && !prevRequest.sent) {
const response = await $api.get("/tokens/refresh");
accessToken = response.data.accessToken;
prevRequest.sent = true;
prevRequest.headers.Authorization = `Bearer ${accessToken}`;
return $api(prevRequest);
}
}
);

export default $api;
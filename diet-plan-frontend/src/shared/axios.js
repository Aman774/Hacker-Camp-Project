import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3003",
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log(JSON.parse(localStorage.getItem("user_info")).token);

    console.log("inside request config");
    console.log(JSON.parse(localStorage.getItem("user_info")).token);
    const token = JSON.parse(localStorage.getItem("user_info")).token
      ? JSON.parse(localStorage.getItem("user_info")).token
      : null;
    console.log("token in axios", token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.log("request error---------------------------------------------");
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("success in response ---");
    return response;
  },
  function (error) {
    console.log("error in response ", error);
    const originalRequest = error.config;
    console.log("orginal request", originalRequest);
    console.log("!originalRequest._retry", !originalRequest._retry);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("api/auth/token", {
          refresh_token: JSON.parse(localStorage.getItem("user_info"))
            .refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            console.log("201 sucess in refresh");
            console.log("res", res);
            // 1) put token to LocalStorage
            localStorage.setItem("user_info", JSON.stringify(res.data));
            // localStorageService.setToken(res.data);

            // 2) Change Authorization header
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + JSON.parse(localStorage.getItem("user_info")).token;

            // 3) return originalRequest object with Axios.
            console.log("original", originalRequest);
            return axios(originalRequest);
          }
        });
    }

    // return Error object with Promise
    console.log("response error---------------------------------------------");

    return Promise.reject(error);
  }
);

export default axios;

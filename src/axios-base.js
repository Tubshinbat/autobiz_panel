import axios from "axios";

const instance = axios.create({
  baseURL: "https://admin.autobiz.mn/rest/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;

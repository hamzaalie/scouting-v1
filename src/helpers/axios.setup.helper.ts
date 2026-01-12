import axios, {AxiosError, AxiosResponse} from "axios";

const API_BASE_URL = `${
    process.env.REACT_APP_API_URL || "https://api.idasports.io"
}${process.env.REACT_APP_API_PREFIX || "/api"}`;

export const API_URL = API_BASE_URL;

const httpsAgent = undefined;

const axiosApi = axios.create({
    baseURL: API_URL,
    httpsAgent: httpsAgent,
});
axiosApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export async function get(
    url: string,

    config: any = {
        httpsAgent: httpsAgent,
    }
) {
    //console.log("🚀 ~ get url:", url);
    return await axiosApi
        .get(url, {...config})
        .then((response) => successProcess(response))
        .catch((err) => errorProcess(err));
}

export async function post(
    url: string,
    data: any = {},
    config: any = {
        httpsAgent: httpsAgent,
    }
) {
    //console.log("🚀 ~ post url:", url);
    return axiosApi
        .post(url, data, {...config})
        .then((response) => successProcess(response))
        .catch((err) => errorProcess(err));
}

export async function put(
    url: string,
    data: any = {},
    config: any = {
        httpsAgent: httpsAgent,
    }
) {
    //console.log("🚀 ~ put url:", url);
    return axiosApi
        .put(url, data, {...config})
        .then((response) => successProcess(response))
        .catch((err) => errorProcess(err));
}

export async function patch(
    url: string,
    data: any = {},
    config: any = {
        httpsAgent: httpsAgent,
    }
) {
    //console.log("🚀 ~ patch url:", url);
    return axiosApi
        .patch(url, data, {...config})
        .then((response) => successProcess(response))
        .catch((err) => errorProcess(err));
}

export async function del(
    url: string,
    config = {
        httpsAgent: httpsAgent,
    }
) {
    //console.log("🚀 ~ del url:", url);
    return await axiosApi
        .delete(url, {...config})
        .then((response) => successProcess(response))
        .catch((err) => errorProcess(err));
}

const successProcess = (response: AxiosResponse) => {
    if (response.status >= 200 || response.status <= 299) return response.data;
    throw response.data;
};

const errorProcess = (err: AxiosError) => {
    //console.log("err?.isAxiosError = ", err?.isAxiosError);
    //console.log("err?.cause = ", err?.cause);
    //console.log("err = ", err);
    let message;
    if (err.response && err.response.status) {
        console.log(err.response);
        switch (err.response.status) {
            case 404:
                //console.log("🚀 ~ errorProcess ~ here 404:");
                message = err?.message
                    ? err?.message
                    : "Désolé! l'API que vous appelez est introuvable";
                break;
            case 400:
                //console.log("🚀 ~ errorProcess ~ here 400:");
                message =
                    err?.response?.data?.message &&
                    err.response.data?.message.includes("credentials")
                        ? "Incorrect credentials"
                        : err?.message
                          ? err?.message
                          : "Désolé! l'API que vous appelez est introuvable";
                break;
            case 500:
                //console.log("🚀 ~ errorProcess ~ here 500:");

                message =
                    "Désolé! un problème est survenu, veuillez contacter notre équipe d'assistance";
                break;
            case 401:
                //console.log("🚀 ~ errorProcess ~ here 401:");

                message = err.message;
                break;
            default:
                //console.log("🚀 ~ errorProcess ~ err.message:", err.message);
                message = err.message;
                break;
        }
    } else if (err.status === 0 && err.code === "ERR_NETWORK") {
        message =
            "Désolé! impossible de donner suite à votre requête, veuillez contacter notre équipe d'assistance";
    }
    throw message;
};

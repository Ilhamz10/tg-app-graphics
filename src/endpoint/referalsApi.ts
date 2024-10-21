import { baseApi } from "../api/api";

const referalsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBotReferals: build.query({
            query: () => ({
                url: ''
            })
        })
    })
})
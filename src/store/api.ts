import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({ baseUrl: "https://api.github.com/" });

const loggingBaseQuery: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  return rawBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: loggingBaseQuery,
  tagTypes: ["User", "Settings"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({}),
});

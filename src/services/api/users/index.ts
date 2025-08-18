// import { api } from "@/src/store/api";

// export type User = { id: string; name: string };

// export const usersApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getUser: builder.query<User, string>({
//       query: (id) => `users/${id}`,
//       providesTags: (result, _err, id) => [{ type: "User", id }],
//     }),
//     updateUser: builder.mutation<User, { id: string; name: string }>({
//       query: ({ id, ...patch }) => ({
//         url: `users/${id}`,
//         method: "PATCH",
//         body: patch,
//       }),
//       invalidatesTags: (_result, _err, { id }) => [{ type: "User", id }],
//     }),
//   }),
//   overrideExisting: false,
// });

// // Auto-generated hooks
// export const { useGetUserQuery, useLazyGetUserQuery, useUpdateUserMutation } =
//   usersApi;

import { api } from "../../../store/rtk/api";
export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};

export type GithubUserDetail = GithubUser & {
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

export const githubApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      GithubUser[],
      { since?: number; per_page?: number }
    >({
      query: ({ since = 0, per_page = 20 }) =>
        `users?since=${since}&per_page=${per_page}`,
    }),
    searchUsers: builder.query<
      { items: GithubUser[]; total_count: number },
      { q: string; page?: number; per_page?: number }
    >({
      query: ({ q, page = 1, per_page = 30 }) => {
        return {
          url: "search/users",
          params: {
            q,
            page,
            per_page,
          },
        };
      },
    }),
    getUserDetail: builder.query<GithubUserDetail, string>({
      query: (username) => `users/${username}`,
      providesTags: (result, _err, username) => [
        { type: "User", id: username },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserDetailQuery,
  useLazyGetUsersQuery,
  useLazySearchUsersQuery,
} = githubApi;

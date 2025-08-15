import { useQuery } from "@tanstack/react-query";

export async function fetchGitHubUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ["githubUser", username],
    queryFn: () => fetchGitHubUser(username),
    enabled: !!username,
  });
}

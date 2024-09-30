export interface User {
  login: string;
  avatar_url: string;
  id: number;
}

export interface UsersRes {
  items: User[];
  total_count: number;
}

export const fetchGitHubUsers = async (
  username: string,
  page: number
): Promise<UsersRes> => {
  const res = await fetch(
    `https://api.github.com/search/users?q=${username}&page=${page}&per_page=10`
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

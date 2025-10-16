import fs from "fs/promises";
import path from "path";

const dataPath = path.join(__dirname, "../../data/users.json");

type User = {
  id: number;
  username: string;
  password: string;
};

export const getAll = async (): Promise<User[]> => {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

export const findByUsername = async (username: string): Promise<User | undefined> => {
  const users = await getAll();
  return users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
};

export const create = async (newUser: Partial<User>): Promise<User> => {
  const users = await getAll();
  const user: User = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    username: newUser.username || "usuario",
    password: newUser.password || "",
  };
  users.push(user);
  await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
  return user;
};


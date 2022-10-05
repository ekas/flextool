import { User } from "./user.type";

export interface PageListItem {
  createdAt: string;
  definition: string;
  id: string;
  isPublic: boolean;
  name: string;
  slug: string;
  updatedAt: string;
  userId: string;
  user: User;
}

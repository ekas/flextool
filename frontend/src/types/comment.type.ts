import { User } from "./user.type";

export default interface CommentBaseItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  pageId: string;
  userId: string;
  user: User;
}

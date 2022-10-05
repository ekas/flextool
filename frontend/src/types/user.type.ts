export interface User {
  id: string | null;
  firstName?: string;
  lastName?: string;
  role: "DEVELOPER" | "ADMIN" | "OPERATOR" | null;
}

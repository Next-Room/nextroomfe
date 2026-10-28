export interface LogInValueType {
  email: string;
  password: string;
}

export type FindpwResultType = "success" | "notFound" | "google" | null;

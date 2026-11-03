export type ActionResponse<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

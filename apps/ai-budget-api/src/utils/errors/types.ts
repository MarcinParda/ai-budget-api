export type UnknownError = Error & {
  isOperational?: boolean;
  statusCode?: number;
  status?: string;
};

export interface ErrorExtensions {
  code: string;
  message?: string;
}

export interface GraphQLError {
  message: string;
  extensions: ErrorExtensions;
}

export interface NetworkError {
  message: string;
}

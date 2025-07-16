export type TokenType = 'USER';

export const TOKEN_TYPES = {
  USER: 'USER',
};

export interface DecodedToken {
  exp: number;
  id: string;
  type?: string;
}

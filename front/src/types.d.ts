export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface ICocktail {
  _id: string;
  name: string;
  cocktailImage: string;
  isPublished: boolean;
}

export interface IApiCocktail extends ICocktail {
  recipe: string;
  ingredients: IIngredient[];
}

export interface IIngredient {
  name: string;
  amount: string;
}

export interface ICocktailMutation {
  name: string;
  cocktailImage: File | null;
  recipe: string;
  ingredients: IIngredient[];
}

export type TCocktailMutation = Omit<ICocktailMutation, 'ingredients'>;

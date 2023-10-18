export interface IUser {
  email: string;
  password: string;
  role: string;
  token: string;
  displayName: string;
  googleId?: string;
  avatar: string;
}

export interface IIngredient {
  name: string;
  amount: string;
}

export interface ICocktail {
  author: Object._id;
  name: string;
  cocktailImage: string;
  recipe: string;
  isPublished: boolean;
  ingredients: IIngredient[];
}

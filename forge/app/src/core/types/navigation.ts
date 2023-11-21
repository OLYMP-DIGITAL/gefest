import { User } from 'core/features/users/users.types';

export type NavigationStack = {
  Home: undefined;
  Partners: undefined;

  // Auth navigator
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
  Finished: { user: User };
};

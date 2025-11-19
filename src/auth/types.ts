export type RoleCollection = 'Blending_Administrator' | 'Blending_User';

export type Feature =
  | 'default-settings.view'
  | 'default-settings.maintain'
  | 'formulas.view'
  | 'formulas.create'
  | 'formulas.update'
  | 'formulas.retire'
  | 'blend-tickets.view-all'
  | 'blend-tickets.view-own'
  | 'blend-tickets.create'
  | 'blend-tickets.edit';

export interface User {
  id: string;
  name: string;
  email: string;
  roleCollection: RoleCollection[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  roleCollection: RoleCollection[];
  canAccess: (feature: Feature) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

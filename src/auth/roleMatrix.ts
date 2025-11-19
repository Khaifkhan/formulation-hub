import { Feature, RoleCollection } from './types';

// RBAC Matrix based on requirements
const ROLE_PERMISSIONS: Record<RoleCollection, Feature[]> = {
  Blending_Administrator: [
    'default-settings.view',
    'default-settings.maintain',
    'formulas.view',
    'formulas.create',
    'formulas.update',
    'formulas.retire',
    'blend-tickets.view-all',
    'blend-tickets.view-own',
    'blend-tickets.create',
    'blend-tickets.edit',
  ],
  Blending_User: [
    'default-settings.view',
    'formulas.view',
    'blend-tickets.view-own',
    'blend-tickets.create',
    'blend-tickets.edit',
  ],
};

export function canAccess(
  roleCollection: RoleCollection[],
  feature: Feature
): boolean {
  if (!roleCollection || roleCollection.length === 0) {
    return false;
  }

  return roleCollection.some((role) => {
    const permissions = ROLE_PERMISSIONS[role];
    return permissions && permissions.includes(feature);
  });
}

export function hasRole(
  roleCollection: RoleCollection[],
  role: RoleCollection
): boolean {
  return roleCollection.includes(role);
}

export function isAdmin(roleCollection: RoleCollection[]): boolean {
  return hasRole(roleCollection, 'Blending_Administrator');
}

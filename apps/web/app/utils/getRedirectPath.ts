import type { UserRole } from '@project-valkyrie/interfaces';

/**
 * Determines the redirect path after login based on user role.
 * Currently all roles redirect to the dashboard ("/") since role-specific
 * features haven't been implemented yet.
 * 
 * Future enhancement: When role-specific features are added, update this
 * function to route users to their appropriate landing pages:
 * - ADMIN: "/admin" (admin panel)
 * - MANAGER: "/reports" (management reports)
 * - USER: "/" (employee dashboard)
 */
export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'ADMIN':
      // Future: return '/admin';
      return '/';
    case 'MANAGER':
      // Future: return '/reports';
      return '/';
    case 'USER':
      return '/';
    default:
      return '/';
  }
}

import { create } from 'zustand';

export type Role = 'owner' | 'manager' | 'finance';

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  role: 'owner',
  setRole: (role) => set({ role }),
}));

export const ROLE_LABELS: Record<Role, string> = {
  owner: 'Owner',
  manager: 'Manager',
  finance: 'Finance',
};

export const ROLE_COLORS: Record<Role, string> = {
  owner: 'bg-primary',
  manager: 'bg-secondary',
  finance: 'bg-success',
};

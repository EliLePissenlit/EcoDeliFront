// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/dashboard',
  AUTH: '/auth',
  ADMINISTRATION: '/administration',
  PROFILE: '/profile',
  TASKS: '/tasks',
};

// ----------------------------------------------------------------------

export const paths = {
  dashboard: ROOTS.DASHBOARD,
  tasks: {
    root: ROOTS.TASKS,
    list: ROOTS.TASKS,
    create: `${ROOTS.TASKS}/create`,
    detail: (id: string) => `${ROOTS.TASKS}/${id}`,
    messages: (id: string) => `${ROOTS.TASKS}/${id}/messages`,
  },
  administration: {
    root: ROOTS.ADMINISTRATION,
    users: `${ROOTS.ADMINISTRATION}/users`,
    categories: `${ROOTS.ADMINISTRATION}/categories`,
    pricing: `${ROOTS.ADMINISTRATION}/pricing`,
    relayPoints: `${ROOTS.ADMINISTRATION}/relay-points`,
    tasks: `${ROOTS.ADMINISTRATION}/tasks`,
  },
  profile: ROOTS.PROFILE,
  auth: {
    root: ROOTS.AUTH,
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },
  profileWithTab: (tab: string) => `${ROOTS.PROFILE}?tab=${tab}`,
};

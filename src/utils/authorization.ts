import { ROLES } from "./constants";

const authorization = {
  createdish: [ROLES.ADMIN, ROLES.SUPERADMIN],
  getdishbyid: [ROLES.ADMIN, ROLES.SUPERADMIN],
  getdishbycafeid: [ROLES.ADMIN, ROLES.SUPERADMIN],
  uploadimage: [ROLES.ADMIN, ROLES.SUPERADMIN],
  createcategory: [ROLES.ADMIN, ROLES.SUPERADMIN],
  createtheme: [ROLES.SUPERADMIN],
};

const isAuthorized = (endpoint: keyof typeof authorization, role: string) =>
  authorization[endpoint] ? authorization[endpoint].includes(role) : true;

export { isAuthorized };

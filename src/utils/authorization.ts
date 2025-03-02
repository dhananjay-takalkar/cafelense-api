const authorization = {
  createdish: ["admin", "superadmin"],
  getdishbyid: ["admin", "superadmin"],
  getdishbycafeid: ["admin", "superadmin"],
  uploadimage: ["admin", "superadmin"],
  createcategory: ["admin", "superadmin"],
};

const isAuthorized = (endpoint: keyof typeof authorization, role: string) =>
  authorization[endpoint] ? authorization[endpoint].includes(role) : true;

export { isAuthorized };

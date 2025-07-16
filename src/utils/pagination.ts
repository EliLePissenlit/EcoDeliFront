export const pagination = (page: number, rowsPerPage: number) => ({
  page: page || 1,
  rowsPerPage: rowsPerPage || 10,
});

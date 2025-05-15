export const createResponse = <T extends object | null>(
  success: boolean,
  message: string,
  data?: T
) => {
  return {
    success,
    message,
    data,
  };
};

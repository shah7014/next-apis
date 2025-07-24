export const getAsSuccessResponse = (key, data) => {
  const res = {
    status: "success",
    data: {
      [key]: data,
    },
  };
  if (Array.isArray(data)) {
    return {
      ...res,
      results: data.length,
    };
  }
  return res;
};

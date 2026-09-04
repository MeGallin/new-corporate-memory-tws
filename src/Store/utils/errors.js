export const getApiErrorMessage = (
  error,
  fallback = 'An unexpected error occurred',
) => {
  const responseMessage =
    error?.response?.data?.error || error?.response?.data?.message;

  if (Array.isArray(responseMessage)) return responseMessage.join(', ');
  if (responseMessage) return String(responseMessage);
  if (error?.response?.status) return `Server Error: ${error.response.status}`;
  if (error?.request) return 'Network error. Please check your connection.';
  return error?.message || fallback;
};

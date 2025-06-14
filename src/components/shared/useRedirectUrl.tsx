export const useRedirectUrl = () => {
  const currentUrl = new URL(location.href);

  // Remove current redirectUrl to prevent infinite redirections
  if (currentUrl.searchParams.get('redirectUrl')) {
    currentUrl.searchParams.delete('redirectUrl');
  }

  return currentUrl.href;
};

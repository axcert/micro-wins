... 
export const getAuthTokens = async (): Promise<AuthTokens | null> => {
  try {
    const tokensString = await SecureStore.getItemAsync(AUTH_TOKENS_KEY);
    const tokens: AuthTokens = tokensString ? JSON.parse(tokensString) : null;
    return tokens;
  } catch (err) {
    console.error('Error retrieving auth tokens:', err);
    return null;
  }
};

export const refreshTokens = async (): Promise<AuthTokens> => {
  const tokens = await getAuthTokens();
  
  if (!tokens?.refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post(`${API_URL}/auth/refresh-tokens`, {
      refreshToken: tokens.refreshToken,
    });
    const newTokens: AuthTokens = response.data;
    await SecureStore.setItemAsync(AUTH_TOKENS_KEY, JSON.stringify(newTokens));
    return newTokens;
  } catch (err) {
    console.error('Error refreshing tokens:', err);
    await clearAuthTokens();
    throw err;
  }
};

export const clearAuthTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKENS_KEY);
  } catch (err) {
    console.error('Error clearing auth tokens:', err);
  }
};
...
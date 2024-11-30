export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const isTokenExpired = (token) => {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp && Date.now() >= payload.exp * 1000) {
        return true; 
    }

    return false; 
};

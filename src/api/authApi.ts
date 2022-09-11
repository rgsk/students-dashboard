export const credentials = {
  email: 'pw@gmail.com',
  password: '123',
};
const TOKEN = 'TLy7pcmA0ZsAExBvKXWHK0wqByrOKIQ5uohzdvLmaGaj2RpgF';
const TOKEN_KEY = 'token';
const setToken = () => {
  window.localStorage.setItem(TOKEN_KEY, TOKEN);
};
const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};
const revokeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};
const isLoggedIn = () => {
  const tokenSaved = getToken();
  return tokenSaved === TOKEN;
};
const login = ({ email, password }: { email: string; password: string }) => {
  if (email === credentials.email && password === credentials.password) {
    setToken();
    return {
      message: 'Logged in successfully',
    };
  }
  return {
    error: true,
    message: 'Invalid credentials',
  };
};
const logout = () => {
  revokeToken();
};

const authApi = {
  isLoggedIn,
  login,
  logout,
};
export default authApi;

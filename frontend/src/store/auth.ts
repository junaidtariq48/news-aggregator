export const auth = {
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
  login(token: string) {
    localStorage.setItem("token", token);
  },
  logout() {
    localStorage.removeItem("token");
  },
};

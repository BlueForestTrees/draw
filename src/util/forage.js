export default {
    getAccessToken: () => localStorage.getItem("token"),
    clearAccessToken: () => localStorage.removeItem("token"),
    setAccessToken: token => localStorage.setItem("token", token),
}
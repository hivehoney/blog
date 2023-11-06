export default function getIsLogin() {
    return !!localStorage.getItem('userId')
}
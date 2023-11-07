export function getUser() {
    return localStorage.getItem('user');
}

export function setUser(user: string) {
    localStorage.setItem('user', user);
}

export function clearUser() {
    localStorage.removeItem('user');
}

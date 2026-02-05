export function checkValid(password) {
    if(/^[A-Z]/.test(password)) {
        return true
    }
    else {
        return false
    }
}
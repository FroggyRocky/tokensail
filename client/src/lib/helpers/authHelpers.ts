export function isTokenValid(tokenExpirationData:string | undefined | null) {
    if(!tokenExpirationData) return false
    const now = new Date()
    const tokenExpirationDate = new Date(tokenExpirationData)
    return now < tokenExpirationDate
}
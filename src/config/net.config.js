export const netConfig = {
    cors: true,
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
    contentType: 'application/json;charset=UTF-8',
    messageDuration: 3 * 1000,
    requestTimeOut: 900000,
    successCode: 200,
}
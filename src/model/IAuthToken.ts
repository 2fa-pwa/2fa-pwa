export interface IAuthToken {
    secret: string,
    issuer: string | null
}

export default IAuthToken;

export interface IUser {
    id: string,
    name: string,
    email: string,
    birthdate: Date,
    phone: string,
    imgUser: string,
    role: {
        id: number,
        name: string,
    }
    createdAt: string,
}
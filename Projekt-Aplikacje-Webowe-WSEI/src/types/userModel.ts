export interface User{
    id: number;
    name: string;
    surname: string;
    role: "Admin" | "Developer" | "Devops";
}
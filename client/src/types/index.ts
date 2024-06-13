export * from "./reactTypes";

export interface Users {
    _id: number;
    username: string;
    record: number[];    
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}



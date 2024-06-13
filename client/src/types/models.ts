export interface User {
    _id: number;
    username: string;
    record: number[];    
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
  sender: User | null; // UserId
  content: string; // message content
  time: Date;
}

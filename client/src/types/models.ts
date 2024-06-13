export interface Users {
    _id: number;
    username: string;
    record: number[];    
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
  sender: string; // UserId
  content: string; // message content
  time: Date; // message time
}

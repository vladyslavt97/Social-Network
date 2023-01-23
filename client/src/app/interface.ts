export interface UserInfo {
    id: number;
    first: string,
    last: string,
    bio: string,
    profile_pic_url: string,
    email: string
}

// Se data types: what is id, fid. And form whom is first, last, email, pass, profile pic.
export interface Friend {
    id: number,
    fid: number;
    sender_id: number;
    recipient_id: number;
    accepted: boolean;
    timestamp: number;
    first: string;
    last: string;
    email: string;
    profile_pic_url: string;
    bio: string;
    password: string;
    created_at: string;
}


export interface Message {
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
    sender_id: number;
    recipient_id: number;
    timestamp: number;
    message: string;
    created_at: string;
    info: object;
}

// In typscrip we DONT use ANY!
export type Action = {
    type: String;
    payload: any;
};
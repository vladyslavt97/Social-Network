export interface UserInfo {
    first: string,
    last: string,
    bio: string,
    profile_pic_url: string,
    email: string
}

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
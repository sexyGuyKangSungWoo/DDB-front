
import { DocAPI } from './DocAPI';
import { User } from './User';

export interface Rating {
    id: number;
    star: number;
    title: string;
    body: string;
    docAPI: DocAPI;
    createdAt: Date;
    updatedAt: Date;
    author: User;
}
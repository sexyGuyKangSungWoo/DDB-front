
import { User } from './User';

export interface DocAPILangUsage {
    docAPIId: string;
    v: number;
    editor: User;
    lang: string;
    code: string;
    delete: boolean;
};
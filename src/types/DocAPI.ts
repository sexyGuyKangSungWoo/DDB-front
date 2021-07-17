
import { User } from './User';
import { DocAPILangUsage } from './DocAPILangUsage';
import { Rating } from './Rating';

export interface DocAPI {
    id: string;
    v: number;
    name: string;
    apiType: string;
    description: string;
    publicEdit: boolean;
    editor: User;
    averageRatingStar: number;
    views: number;
    endPoint: string,
    providerURL: string,
    apiStatus: {
        docAPIId: string,
        live: boolean,
        lastResult: string
    }
    docAPILangUsages: DocAPILangUsage[];
    createdAt: Date;
    updatedAt: Date;
    owner?: User;
    ratings: Rating[];
}
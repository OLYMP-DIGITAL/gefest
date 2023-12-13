export interface docResponse {
    data: docResponseType[];
};

type docResponseType = {
    
}

export interface document {
    ru: string;
    eng: string; 
    link: string;
};

export const DocumentsAtomKey = 'DocumentsAtomKey';
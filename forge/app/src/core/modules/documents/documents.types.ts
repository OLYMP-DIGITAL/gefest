export interface docResponse {
    data: docResponseObject[];
};

type docResponseObject = {
    id: number;
    attributes: { ru: string; eng: string; document: file };
}

type file = {
    data: { attributes: {name: string; url: string }};
}

export interface document {
    id: number;
    ru: string;
    eng: string; 
    link: string;
    name: string;
};

export const DocumentsAtomKey = 'DocumentsAtomKey';

export interface faqResponse {
    data: responseDataObject[];
};

type responseDataObject = {
    id: number;
    attributes: { title: string; description: string };
};

export interface faq {
    id: number;
    title: string; 
    description: string;
};

export const FaqAtomKey = 'FaqAtomKey';
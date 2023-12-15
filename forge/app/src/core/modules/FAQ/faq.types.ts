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
import api from 'core/services/api';
import { docResponse } from './documents.types';

export enum DocumentRoutes {
  documents = 'documents',
}

export const fetchDocuments = (): Promise<docResponse> => {
  return api.get<docResponse>(DocumentRoutes.documents);
};


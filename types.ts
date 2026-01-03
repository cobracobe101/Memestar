
export type AdPlacement = 'standard' | 'elite' | 'edge';

export interface MemeCoin {
  id: string;
  name: string;
  ticker: string;
  contractAddress: string;
  website: string;
  telegram?: string;
  twitter?: string;
  description: string;
  imageUrl?: string;
  timestamp: number;
  placement: AdPlacement;
}

export enum PromotionStatus {
  IDLE = 'IDLE',
  PAYING = 'PAYING',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

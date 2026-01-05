export type AdPlacement = 'standard' | 'elite' | 'edge' | 'top_banner' | 'bottom_banner';

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
  PROOF_OF_PAYMENT = 'PROOF_OF_PAYMENT',
  VERIFYING = 'VERIFYING',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

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
}

export enum PromotionStatus {
  IDLE = 'IDLE',
  PAYING = 'PAYING',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface DetectionResult {
  id: string;
  timestamp: string;
  filename: string;
  fileType: 'image' | 'video';
  fileUrl: string;
  confidence: number;
  isDeepfake: boolean;
  regions?: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  dateJoined: string;
  detectionCount: number;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface Statistic {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}
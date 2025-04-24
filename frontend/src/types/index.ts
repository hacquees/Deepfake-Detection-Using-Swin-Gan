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
  framePaths?: string[];
}

export interface User {
  id: number; // Change to number to match backend
  name: string;
  email: string;
  avatarUrl?: string; // Already optional
  dateJoined?: string; // Make optional since backend doesn't provide it
  detectionCount?: number; // Make optional since backend doesn't provide it
  password?: string; // Add password as optional to match backend
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface Statistic {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}
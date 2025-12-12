import { Timestamp } from '@angular/fire/firestore';
import { UserPrompt } from './prompt.model';

export interface HistoryItem {
  id: string;
  prompt: UserPrompt;
  imageUrl: string;
  createdAt: Timestamp;
}

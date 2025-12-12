import { inject, Injectable, signal, effect } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp, query, getDocs, orderBy } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { HistoryItem } from '../../models/history.model';
import { UserPrompt } from '../../models/prompt.model';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  history = signal<HistoryItem[]>([]);

  constructor() {
    effect(() => {
      const user: User | null = this.authService.currentUser();
      if (user) {
        this.fetchHistory().then(); // Handle promise
      } else {
        this.history.set([]);
      }
    });
  }

  async addHistory(prompt: UserPrompt, imageUrl: string) {
    const userId = this.authService.getUserId();
    if (!userId) return;

    const historyCollection = collection(this.firestore, `users/${userId}/history`);
    await addDoc(historyCollection, {
      prompt,
      imageUrl,
      createdAt: serverTimestamp()
    });
    await this.fetchHistory(); // Refresh history after adding
  }

  private async fetchHistory() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    const historyCollection = collection(this.firestore, `users/${userId}/history`);
    const q = query(historyCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const historyItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HistoryItem));
    this.history.set(historyItems);
  }
}

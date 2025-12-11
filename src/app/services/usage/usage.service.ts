import { inject, Injectable, signal, effect } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { User } from '@angular/fire/auth';

const MAX_GENERATIONS_PER_DAY = 4;

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  remainingGenerations = signal(MAX_GENERATIONS_PER_DAY);

  constructor() {
    effect(() => {
      const user: User | null = this.authService.currentUser();
      if (user) {
        this.checkUsage().then();
      } else {
        this.remainingGenerations.set(MAX_GENERATIONS_PER_DAY);
      }
    });
  }

  private async checkUsage() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];
    const usageDocRef = doc(this.firestore, `usage/${userId}/daily/${today}`);

    try {
      const docSnap = await getDoc(usageDocRef);
      if (docSnap.exists()) {
        const count = docSnap.data()?.['count'] || 0;
        this.remainingGenerations.set(Math.max(0, MAX_GENERATIONS_PER_DAY - count));
      } else {
        this.remainingGenerations.set(MAX_GENERATIONS_PER_DAY);
      }
    } catch (error) {
      console.error("Error checking usage:", error);
      this.remainingGenerations.set(0); // Fail safe
    }
  }

  canGenerate(): boolean {
    return this.remainingGenerations() > 0;
  }

  async recordGeneration() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];
    const usageDocRef = doc(this.firestore, `usage/${userId}/daily/${today}`);

    try {
      const docSnap = await getDoc(usageDocRef);
      const currentCount = docSnap.exists() ? docSnap.data()?.['count'] || 0 : 0;

      await setDoc(usageDocRef, {
        count: currentCount + 1,
        lastUpdated: serverTimestamp()
      }, { merge: true });

      this.remainingGenerations.update(val => Math.max(0, val - 1));
    } catch (error) {
      console.error("Error recording generation:", error);
    }
  }
}

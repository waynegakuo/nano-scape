import { Injectable, signal } from '@angular/core';
import { HistoryItem } from '../../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class ImageStateService {
  selectedImage = signal<HistoryItem | null>(null);

  setImage(item: HistoryItem) {
    this.selectedImage.set(item);
  }

  clearImage() {
    this.selectedImage.set(null);
  }
}

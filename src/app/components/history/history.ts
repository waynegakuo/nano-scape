import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../services/history/history.service';
import { HistoryItem } from '../../models/history.model';
import { ImageStateService } from '../../services/image-state/image-state.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrls: ['./history.scss']
})
export class History {
  @Input() selectTab!: (tab: string) => void;

  private historyService = inject(HistoryService);
  private imageStateService = inject(ImageStateService);
  history = this.historyService.history;

  loadHistoryItem(item: HistoryItem) {
    this.imageStateService.setImage(item);
    this.selectTab(item.prompt.concept);
  }
}

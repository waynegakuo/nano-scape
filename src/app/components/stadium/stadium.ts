import { Component, inject, signal, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { AiService } from '../../services/ai/ai.service';
import { LoadingMessagesService } from '../../services/loading-messages/loading-messages.service';
import { ScapeGenerator } from '../../shared/scape-generator/scape-generator';
import { UsageService } from '../../services/usage/usage.service';
import { HistoryService } from '../../services/history/history.service';
import { ImageStateService } from '../../services/image-state/image-state.service';
import { UserPrompt } from '../../models/prompt.model';

@Component({
  selector: 'app-stadium',
  standalone: true,
  imports: [ScapeGenerator],
  templateUrl: './stadium.html',
  styleUrls: ['./stadium.scss'],
})
export class Stadium implements OnInit, OnDestroy {
  @ViewChild(ScapeGenerator) scapeGenerator!: ScapeGenerator;

  isLoading = signal(false);
  generatedImage = signal<string | null>(null);
  error = signal<string | null>(null);

  private aiService = inject(AiService);
  private usageService = inject(UsageService);
  private historyService = inject(HistoryService);
  private imageStateService = inject(ImageStateService);
  public loadingMessagesService = inject(LoadingMessagesService);

  ngOnInit(): void {
    const selectedImage = this.imageStateService.selectedImage();
    if (selectedImage && selectedImage.prompt.concept === 'Stadium') {
      this.generatedImage.set(selectedImage.imageUrl);
      this.scapeGenerator.form.patchValue({ team: selectedImage.prompt.data.team });
      this.imageStateService.clearImage();
    }
  }

  async generateImage(formValue: any) {
    const teamInfo = {
      team: formValue.team
    };
    const userPrompt: UserPrompt = { concept: 'Stadium', data: teamInfo };
    await this.generate(userPrompt);
  }

  private async generate(userPrompt: UserPrompt) {
    this.isLoading.set(true);
    this.generatedImage.set(null);
    this.error.set(null);
    this.loadingMessagesService.startCycling();
    this.scapeGenerator.scrollIntoView();

    try {
      const res = await this.aiService.generateContent(userPrompt);
      if (res) {
        this.generatedImage.set(res);
        await this.usageService.recordGeneration();
        await this.historyService.addHistory(userPrompt, res);
      }
    } catch (error) {
      this.error.set('An error occurred while generating the image. Please try again.');
      console.error('Generation failed:', error);
    } finally {
      this.isLoading.set(false);
      this.loadingMessagesService.stopCycling();
    }
  }

  ngOnDestroy(): void {
    this.loadingMessagesService.stopCycling();
  }
}

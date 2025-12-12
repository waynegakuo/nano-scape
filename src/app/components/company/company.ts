import {Component, inject, signal, ViewChild, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import {ScapeGenerator} from '../../shared/scape-generator/scape-generator';
import {AiService} from '../../services/ai/ai.service';
import {LoadingMessagesService} from '../../services/loading-messages/loading-messages.service';
import {UsageService} from '../../services/usage/usage.service';
import {HistoryService}from '../../services/history/history.service';
import {ImageStateService} from '../../services/image-state/image-state.service';
import { UserPrompt } from '../../models/prompt.model';

@Component({
  selector: 'app-company',
  imports: [
    ScapeGenerator
  ],
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company implements OnInit, AfterViewInit, OnDestroy {
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
    // ngOnInit can be used for initial setup that doesn't depend on ViewChild
  }

  ngAfterViewInit(): void {
    const selectedImage = this.imageStateService.selectedImage();
    if (selectedImage && selectedImage.prompt.concept === 'Company') {
      this.generatedImage.set(selectedImage.imageUrl);
      // Access form after ViewChild is initialized
      if (this.scapeGenerator && this.scapeGenerator.form) {
        this.scapeGenerator.form.patchValue({ company: selectedImage.prompt.data.companyName });
      }
      this.imageStateService.clearImage();
    }
  }

  async generateImage(formValue: any) {
    const companyInfo = {
      companyName: formValue.company
    };
    const userPrompt: UserPrompt = { concept: 'Company', data: companyInfo };
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

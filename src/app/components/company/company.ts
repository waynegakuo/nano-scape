import {Component, inject, signal, ViewChild, OnDestroy} from '@angular/core';
import {ScapeGenerator} from '../../shared/scape-generator/scape-generator';
import {AiService} from '../../services/ai/ai.service';
import {LoadingMessagesService} from '../../services/loading-messages/loading-messages.service';
import {UsageService} from '../../services/usage/usage.service';

@Component({
  selector: 'app-company',
  imports: [
    ScapeGenerator
  ],
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company implements OnDestroy {
  @ViewChild(ScapeGenerator) scapeGenerator!: ScapeGenerator;

  isLoading = signal(false);
  generatedImage = signal<string | null>(null);
  error = signal<string | null>(null);

  private aiService = inject(AiService);
  private usageService = inject(UsageService);
  public loadingMessagesService = inject(LoadingMessagesService);

  generateImage(formValue: any) {
    this.isLoading.set(true);
    this.generatedImage.set(null);
    this.error.set(null);
    this.loadingMessagesService.startCycling();
    this.scapeGenerator.scrollIntoView();

    const companyInfo = {
      companyName: formValue.company
    };

    this.aiService.generateContent({ concept: 'Company', data: companyInfo })
      .then(async res => {
        if (res) {
          this.generatedImage.set(res);
          this.usageService.recordGeneration();
        }
        this.isLoading.set(false);
        this.loadingMessagesService.stopCycling();
      })
      .catch(error => {
        this.isLoading.set(false);
        this.loadingMessagesService.stopCycling();
        this.error.set('An error occurred while generating the image. Please try again.');
        console.error('Generation failed:', error);
      });
  }

  ngOnDestroy(): void {
    this.loadingMessagesService.stopCycling();
  }
}

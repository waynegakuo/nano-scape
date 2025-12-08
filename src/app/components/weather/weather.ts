import { Component, inject, signal, OnDestroy, ViewChild } from '@angular/core';
import { AiService } from '../../services/ai/ai.service';
import { LoadingMessagesService } from '../../services/loading-messages/loading-messages.service';
import { ScapeGenerator } from '../../shared/scape-generator/scape-generator';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ScapeGenerator],
  templateUrl: './weather.html',
  styleUrls: ['./weather.scss'],
})
export class Weather implements OnDestroy {
  @ViewChild(ScapeGenerator) scapeGenerator!: ScapeGenerator;

  isLoading = signal(false);
  generatedImage = signal<string | null>(null);
  error = signal<string | null>(null);

  private aiService = inject(AiService);
  public loadingMessagesService = inject(LoadingMessagesService);

  generateImage(formValue: any) {
    this.isLoading.set(true);
    this.generatedImage.set(null);
    this.error.set(null);
    this.loadingMessagesService.startCycling();
    this.scapeGenerator.scrollIntoView();

    const cityInfo = {
      city: formValue.city
    };

    this.aiService.generateContent({ concept: 'Weather', data: cityInfo })
      .then(async res => {
        this.generatedImage.set(res);
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

import { Component, inject, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AiService } from '../../services/ai/ai.service';
import { LoadingMessagesService } from '../../services/loading-messages/loading-messages.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './weather.html',
  styleUrls: ['./weather.scss'],
})
export class Weather implements OnDestroy {
  weatherForm: FormGroup;
  isLoading = signal(false);
  generatedImage = signal<string | null>(null);
  error = signal<string | null>(null);

  private formBuilder = inject(FormBuilder);
  private aiService = inject(AiService);
  public loadingMessagesService = inject(LoadingMessagesService);

  constructor() {
    this.weatherForm = this.formBuilder.group({
      city: ['', Validators.required],
    });
  }

  generateImage() {
    if (this.weatherForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.generatedImage.set(null);
    this.error.set(null);
    this.loadingMessagesService.startCycling();

    const { city } = this.weatherForm.value;
    const cityInfo = {
      city: city
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

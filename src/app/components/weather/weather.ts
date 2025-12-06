import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AiService} from '../../services/ai/ai.service';

@Component({
  selector: 'app-weather',
  imports: [ReactiveFormsModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.scss'],
})
export class Weather {
  weatherForm: FormGroup;
  isLoading = signal(false);
  generatedImage = signal<string | null>(null);
  error = signal<string | null>(null);

  private formBuilder = inject(FormBuilder);
  private aiService = inject(AiService);

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

    const { city } = this.weatherForm.value;

    // this.genkitService.generate('Weather', { city }).subscribe({
    //   next: (response: any) => {
    //     // Assuming the service returns a URL to the image
    //     this.generatedImage.set(response.imageUrl);
    //     this.isLoading.set(false);
    //   },
    //   error: (err) => {
    //     this.error.set('An error occurred while generating the image. Please try again.');
    //     console.error(err);
    //     this.isLoading.set(false);
    //   },
    // });
  }
}

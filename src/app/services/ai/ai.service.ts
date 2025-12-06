import {inject, Injectable, signal} from '@angular/core';
import {ErrorService} from '../error/error.service';
import {Functions, httpsCallable} from '@angular/fire/functions';
import {ImageGenerationOutput} from '../../models/image.model';
import {UserPrompt} from '../../models/prompt.model';

@Injectable({
  providedIn: 'root',
})
export class AiService {

  private readonly errorService = inject(ErrorService);
  private readonly functions = inject(Functions);

  error = signal<string | null>(null);
  resultImageURL = signal<string | null>(null);

  async generateContent(prompt: UserPrompt): Promise<string> {
    this.error.set(null); // Clear previous errors

    try {
      const generateImage = httpsCallable<{ prompt: UserPrompt }, ImageGenerationOutput>(this.functions, 'generate3DImageFlow');
      const response = await generateImage({ prompt });

      const base64ImageResult = response.data.base64ImageResult;

      if(!base64ImageResult) {
        const msg = 'We could not create an image from that. Try a simpler prompt.';
        this.error.set(msg);
        this.errorService.showError(msg);
        console.error("Firebase function response missing image data:", response);
        return "";
      }

      const imageURL = `data:image/png;base64,${base64ImageResult}`;
      this.resultImageURL.set(imageURL);
      return imageURL;
    }
    catch (e: any) {
      console.error('Firebase function call error: ', e);
      const msg = e.message || 'Failed to generate content. Please try again.';
      this.error.set(msg);
      this.errorService.showError(msg);
      return "";
    }
  }
}

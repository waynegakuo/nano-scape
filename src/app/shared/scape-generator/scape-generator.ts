import {Component, EventEmitter, Input, Output, signal, ViewChild, ElementRef, OnDestroy, OnInit, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage, CommonModule} from '@angular/common';
import {LoadingMessagesService} from '../../services/loading-messages/loading-messages.service';

@Component({
  selector: 'app-scape-generator',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, CommonModule],
  templateUrl: './scape-generator.html',
  styleUrls: ['./scape-generator.scss'],
})
export class ScapeGenerator implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageSrc!: string;
  @Input() imageWidth: number = 150;
  @Input() imageHeight: number = 150;
  @Input() imageAlt!: string;
  @Input() formInputLabel!: string;
  @Input() formInputPlaceholder!: string;
  @Input() formInputError!: string;
  @Input() formControlName!: string;
  @Input() formInputId!: string;
  @Input() isLoading = signal(false);
  @Input() generatedImage = signal<string | null>(null);
  @Input() error = signal<string | null>(null);
  @Input() loadingMessage: string | undefined;

  @Output() generate = new EventEmitter<any>();

  @ViewChild('loadingSection') loadingSection?: ElementRef;

  form!: FormGroup;
  currentTimestamp = Date.now();

  private formBuilder = inject(FormBuilder);
  public loadingMessagesService = inject(LoadingMessagesService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [this.formControlName]: ['', Validators.required],
    });
  }

  onGenerate() {
    if (this.form.invalid) {
      return;
    }
    this.generate.emit(this.form.value);
  }

  ngOnDestroy(): void {
    this.loadingMessagesService.stopCycling();
  }

  public scrollIntoView(): void {
    setTimeout(() => {
      this.loadingSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

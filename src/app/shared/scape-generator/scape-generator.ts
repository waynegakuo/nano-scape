import {Component, EventEmitter, Input, Output, signal, ViewChild, ElementRef, OnDestroy, OnInit, inject, computed} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgOptimizedImage, CommonModule} from '@angular/common';
import {LoadingMessagesService} from '../../services/loading-messages/loading-messages.service';
import {AuthService} from '../../services/auth/auth.service';
import {take} from "rxjs";

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
  private authService = inject(AuthService);
  public loadingMessagesService = inject(LoadingMessagesService);

  readonly isAuthed = computed(() => this.authService.isAuthenticated());
  readonly signingIn = signal(false);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      [this.formControlName]: ['', Validators.required],
    });
  }

  onGenerate() {
    if (!this.isAuthed()) {
      this.signIn();
      return;
    }
    if (this.form.invalid) {
      return;
    }
    this.generate.emit(this.form.value);
  }

  signIn(): void {
    if (this.signingIn()) return;
    this.signingIn.set(true);
    this.authService.signInWithGoogle().pipe(take(1)).subscribe({
      next: () => {
        // After successful sign-in, proceed with generation
        if (this.form.valid) {
          this.generate.emit(this.form.value);
        }
      },
      error: (err) => console.error('Sign-in failed', err),
      complete: () => this.signingIn.set(false)
    });
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

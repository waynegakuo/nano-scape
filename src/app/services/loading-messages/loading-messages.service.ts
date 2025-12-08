import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingMessagesService {
  private readonly messages = [
    "🏙️ Constructing your Nano Scape...",
    "🤖 Assembling miniature marvels...",
    "✨ Shrinking the world to your screen...",
    "🔍 Focusing the nano-lenses...",
    "🌍 Generating a pocket-sized universe...",
    "🎨 Painting with microscopic brushes...",
    "🏗️ Building your tiny metropolis...",
    "💡 Powering up the nano-generators...",
    "💎 Polishing the miniature details...",
    "🧩 Piecing together your scape...",
    "🔬 Analyzing the atomic structure...",
    "🌟 Adding a touch of nano-magic...",
    "🗺️ Charting the miniature world...",
    "⚙️ Calibrating the scape engine...",
    "⏳ Bending time and space for your scape..."
  ];

  private readonly currentMessageIndex = signal<number>(0);
  private cyclingInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Gets a random loading message
   */
  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    this.currentMessageIndex.set(randomIndex);
    return this.messages[randomIndex];
  }

  /**
   * Gets the current message (reactive)
   */
  readonly currentMessage = computed(() => this.messages[this.currentMessageIndex()]);

  /**
   * Sets a specific message by index (useful for testing or specific scenarios)
   */
  setMessageByIndex(index: number): void {
    if (index >= 0 && index < this.messages.length) {
      this.currentMessageIndex.set(index);
    }
  }

  /**
   * Gets the total number of available messages
   */
  get messageCount(): number {
    return this.messages.length;
  }

  /**
   * Starts cycling through messages every second
   */
  startCycling(): void {
    // Stop any existing cycling first
    this.stopCycling();

    // Set initial random message
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    this.currentMessageIndex.set(randomIndex);

    // Start cycling every second
    this.cyclingInterval = setInterval(() => {
      const nextRandomIndex = Math.floor(Math.random() * this.messages.length);
      this.currentMessageIndex.set(nextRandomIndex);
    }, 3000);
  }

  /**
   * Stops the message cycling
   */
  stopCycling(): void {
    if (this.cyclingInterval !== null) {
      clearInterval(this.cyclingInterval);
      this.cyclingInterval = null;
    }
  }
}

import { CommonModule } from '@angular/common';
import {Component, signal} from '@angular/core';
import {Stadium} from '../../components/stadium/stadium';
import {Company} from '../../components/company/company';
import {Character} from '../../components/character/character';
import {Weather} from '../../components/weather/weather';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Stadium, Company, Character, Weather],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected activeTab = signal('Weather')

  protected selectTab(tab: string): void {
    this.activeTab.set(tab);
  }
}

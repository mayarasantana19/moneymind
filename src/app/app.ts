import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';


@Component({
  selector: 'app-root',
  standalone: true, // <-- Assumindo que é standalone
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('moneymind');
}
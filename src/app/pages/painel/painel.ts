import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WelcomeBanner } from '../../components/welcome-banner/welcome-banner';
import { MagicBudget } from '../../components/magic-budget/magic-budget';
import { ArticleSection } from '../../components/article-section/article-section';
@Component({
  imports: [
    CommonModule, 
    FormsModule, 
    WelcomeBanner,
    MagicBudget,
    ArticleSection,
  ],
  
  // O seletor continua o mesmo
  selector: 'app-painel',
  templateUrl: './painel.html',
  styleUrl: './painel.css'
})
export class Painel {
  // A classe pode ficar vazia se não houver lógica
}

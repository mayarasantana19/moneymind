import { Component, signal, computed, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common'; // Inclui registerLocaleData
import { FormsModule } from '@angular/forms';   
import localePt from '@angular/common/locales/pt'; // Importa os dados do locale

// -------------------------------------------------------------------------
// REGISTRO LOCAL FORÇADO: 
// Esta linha é uma redundância proposital para garantir que os dados de 
// formatação de 'pt' sejam carregados se o main.ts falhar.
registerLocaleData(localePt, 'pt'); 
// -------------------------------------------------------------------------


@Component({
  selector: 'app-magic-budget',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  // O uso do LOCALE_ID aqui é um backup caso a injeção global falhe.
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' } 
  ],
  templateUrl: './magic-budget.html',
  styleUrls: ['./magic-budget.css']
})
export class MagicBudget {
  // 1. Sinal para armazenar o valor do input (Inicializado em 0)
  rendaMensal = signal<number>(0); 

  // 2. Sinal computado para calcular 50% (Necessidades Essenciais)
  necessidadesValor = computed(() => {
    const renda = this.rendaMensal();
    return renda > 0 ? renda * 0.50 : 0;
  });

  // 3. Sinal computado para calcular 30% (Desejos Pessoais)
  desejosValor = computed(() => {
    const renda = this.rendaMensal();
    return renda > 0 ? renda * 0.30 : 0;
  });

  // 4. Sinal computado para calcular 20% (Metas Financeiras)
  metasValor = computed(() => {
    const renda = this.rendaMensal();
    return renda > 0 ? renda * 0.20 : 0;
  });
}

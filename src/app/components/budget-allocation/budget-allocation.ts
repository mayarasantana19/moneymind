import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AllocationCard } from '../allocation-card/allocation-card';

@Component({
  selector: 'app-budget-allocation',
  imports: [AllocationCard],
  templateUrl: './budget-allocation.html',
  styleUrl: './budget-allocation.css'
})
export class BudgetAllocationComponent implements OnInit {
  // Recebe a renda mensal do componente pai (ou de um serviço)
  @Input() rendaMensal: number = 0;

  // Variáveis para os cálculos
  necessidades: number = 0; // 50%
  desejos: number = 0;      // 30%
  metas: number = 0;        // 20%

  ngOnInit() {
    this.calcularAlocacao();
  }

  // Se a renda mudar dinamicamente, você pode usar ngOnChanges ou um setter
  ngOnChanges(changes: SimpleChanges) {
     if (changes['rendaMensal']) {
         this.calcularAlocacao();
     }
  }

  calcularAlocacao() {
    this.necessidades = this.rendaMensal * 0.50;
    this.desejos = this.rendaMensal * 0.30;
    this.metas = this.rendaMensal * 0.20;
  }
}

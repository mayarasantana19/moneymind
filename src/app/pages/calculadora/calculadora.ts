import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-calculadora',
  templateUrl: './calculadora.html',
  styleUrls: ['./calculadora.css']
})
export class Calculadora implements OnInit {
  modo: 'juros' | 'meta' = 'juros';

  // JUROS COMPOSTOS
  capitalInicial = 0;
  aporteMensal = 0;
  taxaAnual = 1;
  anos = 1;
  montanteFinal = 0;
  totalInvestido = 0;
  totalJuros = 0;

  // META FINANCEIRA
  metaFinanceira = 0;
  capitalInicialMeta = 0;
  taxaAnualMeta = 1;
  anosMeta = 1;
  aporteMensalNecessario = 0;
  totalAportar = 0;
  totalJurosMeta = 0;

  ngOnInit() {
    this.calcularProjecao();
    this.calcularMeta();
  }

  calcularProjecao() {
    const meses = this.anos * 12;
    const taxaMensal = this.taxaAnual / 100 / 12;

    let montante = this.capitalInicial * Math.pow(1 + taxaMensal, meses); // Comecou o investimento 

    //capital inicial * (1+ (taxaJurosMensal)^meses)
    // 12 meses
    for (let i = 1; i <= meses; i++) {
      montante += this.aporteMensal * Math.pow(1 + taxaMensal, meses - i);
    }
    // montante += aporteMensal * (1 + (taxaJurosMensal)^ meses - i) 


    this.montanteFinal = montante;
    this.totalInvestido = this.capitalInicial + this.aporteMensal * meses;
    this.totalJuros = this.montanteFinal - this.totalInvestido;
  }

  calcularMeta() {
    const meses = this.anosMeta * 12;
    const taxaMensal = this.taxaAnualMeta / 100 / 12;

    // Fórmula inversa para encontrar o aporte mensal necessário
    const futuroCorrigido = this.metaFinanceira - this.capitalInicialMeta * Math.pow(1 + taxaMensal, meses);
    const fator = (Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal;
    this.aporteMensalNecessario = futuroCorrigido / fator;

    this.totalAportar = this.aporteMensalNecessario * meses;
    const montanteFinal = this.capitalInicialMeta * Math.pow(1 + taxaMensal, meses) + this.totalAportar * (1 + taxaMensal);
    this.totalJurosMeta = this.metaFinanceira - (this.capitalInicialMeta + this.totalAportar);
  }
}

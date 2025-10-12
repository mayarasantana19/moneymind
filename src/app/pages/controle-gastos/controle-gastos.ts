import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  imports : [CommonModule, FormsModule],
  selector: 'app-dashboard',
  templateUrl: './controle-gastos.html',
  styleUrls: ['./controle-gastos.css'],
})
export class ControleGastos implements OnInit {
  rendaMensal = 15000;

  categorias = [
    { nome: 'Aluguel/Moradia', valor: 800 },
    { nome: 'Alimentação', valor: 500 },
    { nome: 'Transporte', valor: 200 },
    { nome: 'Lazer', valor: 150 },
    { nome: 'Investimentos', valor: 300 },
  ];

  chart: any;

  get totalGastos(): number {
    return this.categorias.reduce((acc, cat) => acc + Number(cat.valor || 0), 0);
  }

  get saldoDisponivel(): number {
    return this.rendaMensal - this.totalGastos;
  }

  ngOnInit() {
    this.criarGrafico();
  }

  criarGrafico() {
    const ctx = document.getElementById('gastosChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.categorias.map((c) => c.nome),
        datasets: [
          {
            data: this.categorias.map((c) => c.valor),
            backgroundColor: [
              '#f39c12',
              '#2980b9',
              '#27ae60',
              '#9b59b6',
              '#e74c3c',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
        },
      },
    });
  }

  atualizarGrafico() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.categorias.map((c) => c.valor);
      this.chart.data.labels = this.categorias.map((c) => c.nome);
      this.chart.update();
    }
  }

  adicionarCategoria() {
    const nome = prompt('Nome da nova categoria:');
    if (nome) {
      this.categorias.push({ nome, valor: 0 });
      this.atualizarGrafico();
    }
  }
}

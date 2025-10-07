import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 💡 CORREÇÃO: Removemos a importação direta de 'chart.js' para evitar o erro de resolução de módulo (Could not resolve "chart.js").
// Assumimos que a biblioteca Chart.js é carregada externamente via CDN.
declare const Chart: any;
declare const registerables: any;

interface Expense {
  category: string;
  amount: number;
}

@Component({
  selector: 'app-root', // Seletor principal obrigatório para este ambiente
  standalone: true,
  templateUrl: './controle-gastos.html',
  styleUrl: './controle-gastos.css',
  imports: [CommonModule, FormsModule, CurrencyPipe]
})
export class ControleGastos implements OnInit, AfterViewInit {
  @ViewChild('expensesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // Estado da aplicação usando Signals
  income = signal<number>(0);
  expenses = signal<Expense[]>([]);
  chart: any; // Usamos 'any' porque o tipo 'Chart' não está importado

  // Propriedades computadas (substituem getters)
  totalExpenses = computed(() => {
    return this.expenses().reduce((acc, e) => acc + Number(e.amount), 0);
  });

  balance = computed(() => {
    return this.income() - this.totalExpenses();
  });

  constructor() {
    // 💡 REGISTRO OBRIGATÓRIO: Se o Chart.js foi carregado globalmente, precisamos registrar os módulos.
    if (typeof Chart !== 'undefined' && typeof registerables !== 'undefined') {
        Chart.register(...registerables);
    }
  }

  // Ciclo de Vida
  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    // 💡 CORREÇÃO DE TIMING: Adiciona um pequeno delay para garantir que o canvas esteja pronto.
    setTimeout(() => {
      this.createChart();
    }, 150);
  }

  /** 🔹 Handlers de mudança de input (usando Signals) */
  onIncomeChange(value: number): void {
    this.income.set(Number(value) || 0);
    this.onValueChange();
  }

  onExpenseChange(expense: Expense, value: number): void {
    this.expenses.update(currentExpenses => {
      const index = currentExpenses.findIndex(e => e.category === expense.category);
      if (index !== -1) {
        currentExpenses[index].amount = Number(value) || 0;
      }
      return [...currentExpenses]; // Retorna uma nova array para notificar a mudança (imuttability)
    });
    this.onValueChange();
  }

  /** 🔹 Lógica após qualquer mudança de valor */
  onValueChange(): void {
    this.saveData();
    this.updateChart();
  }

  /** 🔹 Adiciona uma nova categoria */
  addCategory(): void {
    const name = window.prompt('Digite o nome da nova categoria:');
    if (name && name.trim()) {
      this.expenses.update(currentExpenses => [...currentExpenses, { category: name.trim(), amount: 0 }]);
      this.saveData();
      this.updateChart();
    }
  }

  /** 🔹 Cria o gráfico de pizza (Doughnut) */
  createChart(): void {
    if (typeof Chart === 'undefined') {
        console.error("Chart.js is not loaded globally. Please ensure the CDN script is loaded before this component initializes.");
        return;
    }
    
    // Verificação de segurança para garantir que o canvas existe.
    const canvasElement = this.canvasRef?.nativeElement;
    if (!canvasElement) {
      console.error("Canvas element not found!");
      return;
    }

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    // Destrói o gráfico anterior, se existir
    if (this.chart) {
      this.chart.destroy();
    }

    const expensesData = this.expenses();
    const baseColors = ['#0A477A', '#6AA84F', '#F4A261', '#E39352', '#264653', '#7D5A87'];
    const backgroundColors = expensesData.map((_, index) => baseColors[index % baseColors.length]);

    // Filtra despesas com valor zero, mas garantimos que há dados para Chart.js
    const dataForChart = expensesData.map(e => e.amount > 0 ? e.amount : 0);

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: expensesData.map(e => e.category),
        datasets: [{
          label: 'Gastos (R$)',
          data: dataForChart,
          backgroundColor: backgroundColors,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let label = context.label || '';
                        if (label) { label += ': '; }
                        // Usamos o formatador do Intl para o tooltip
                        label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed);
                        return label;
                    }
                }
            }
        }
      }
    });
  }

  /** 🔹 Atualiza dados do gráfico */
  updateChart(): void {
    if (!this.chart) {
      this.createChart();
      return;
    }

    const expensesData = this.expenses();
    const dataForChart = expensesData.map(e => e.amount > 0 ? e.amount : 0);
    const baseColors = ['#0A477A', '#6AA84F', '#F4A261', '#E39352', '#264653', '#7D5A87'];
    const backgroundColors = expensesData.map((_, index) => baseColors[index % baseColors.length]);

    this.chart.data.labels = expensesData.map(e => e.category);
    this.chart.data.datasets[0].data = dataForChart;
    this.chart.data.datasets[0].backgroundColor = backgroundColors;

    this.chart.update();
  }

  /** 🔹 Salva dados no localStorage */
  saveData(): void {
    const data = {
      income: this.income(),
      expenses: this.expenses().map(e => ({ category: e.category, amount: Number(e.amount) }))
    };
    localStorage.setItem('financeData', JSON.stringify(data));
  }

  /** 🔹 Carrega dados do localStorage */
  loadData(): void {
    const data = localStorage.getItem('financeData');
    let loadedExpenses: Expense[] = [];

    if (data) {
      const parsed = JSON.parse(data);
      this.income.set(parsed.income || 0);
      loadedExpenses = parsed.expenses || [];
    }

    // 💡 CORREÇÃO DE INICIALIZAÇÃO: Se não houver dados, garante que haja categorias com um valor não-zero
    if (!loadedExpenses || loadedExpenses.length === 0) {
      loadedExpenses = [
        { category: 'Alimentação', amount: 1 }, 
        { category: 'Transporte', amount: 0 },
        { category: 'Moradia', amount: 0 }
      ];
    }
    this.expenses.set(loadedExpenses);
  }

  /** 🔹 Reseta todos os dados */
  resetData(): void {
    // Usamos window.confirm para este ambiente
    if (window.confirm('Tem certeza que deseja limpar todos os dados?')) {
      localStorage.removeItem('financeData');
      this.income.set(0);
      this.expenses.set([
        { category: 'Alimentação', amount: 1 }, // Mantém 1 para garantir o gráfico
        { category: 'Transporte', amount: 0 },
        { category: 'Moradia', amount: 0 }
      ]);
      this.updateChart();
    }
  }
}

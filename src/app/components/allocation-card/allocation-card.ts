import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-allocation-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './allocation-card.html',
  styleUrl: './allocation-card.css'
})

export class AllocationCard {
  @Input() titulo: string = '';
  @Input() percentual: number = 0; // Ex: 50
  @Input() limiteMaximo: number = 0; // O valor calculado
  @Input() descricao: string = '';
  @Input() cor: 'red' | 'yellow' | 'green' = 'red'; // Para as cores de destaque
  @Input() icone: string = ''; // Ex: '🏠', '🛍️', '💰'
}
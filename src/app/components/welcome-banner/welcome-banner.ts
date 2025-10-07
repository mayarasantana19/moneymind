import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-banner',
  imports: [],
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.css'
})
export class WelcomeBanner {
  // Lógica: Redirecionar para o painel de controle de gastos
  irParaControle() {
    console.log('Navegando para o controle de gastos...');
    // Implemente a navegação aqui (ex: this.router.navigate(['/controle']))
  }
}

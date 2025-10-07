import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  // Certifique-se de que o caminho para o CSS (com a media query) esteja correto aqui:
  styleUrls: ['./header.css'] 
})
export class Header {
  // 🟢 VARIÁVEL CRUCIAL: Controla se o menu deve estar visível
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  // 🟢 FUNÇÃO CRUCIAL: Alterna o estado do menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Fecha o menu após o logout
    this.isMenuOpen = false; 
  }
}
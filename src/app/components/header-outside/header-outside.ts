import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service/auth.service';

@Component({
  selector: 'app-header-outside',
  imports: [],
  templateUrl: './header-outside.html',
  styleUrl: './header-outside.css'
})
export class HeaderOutside {
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

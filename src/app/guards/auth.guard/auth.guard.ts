import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service/auth.service'; // Ajuste o caminho conforme sua estrutura


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // Permite o acesso
    } else {
      this.router.navigate(['/login']); // Bloqueia e redireciona para a tela de login
      return false;
    }
  }
}
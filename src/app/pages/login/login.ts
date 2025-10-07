import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service/auth.service'; // Ajuste o caminho

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // 1. Tenta logar via AuthService
    if (this.authService.login(this.username, this.password)) {
      // 2. Se for sucesso, redireciona para o painel
      this.router.navigate(['/painel']); 
    } else {
      // 3. Se for falha, exibe a mensagem de erro
      this.errorMessage = 'Usuário ou senha incorretos';
    }
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validação simples dos campos
    if (!this.name || !this.email || !this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    // Validação de senha
    if (this.password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    // Simulação de cadastro bem-sucedido
    this.successMessage = 'Cadastro realizado com sucesso! Redirecionando...';

    // Salva temporariamente o usuário no localStorage (simulação)
    const userData = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    // Redireciona após alguns segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}

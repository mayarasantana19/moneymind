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
  name = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  errorMessage = '';
  successMessage = '';

  // Controle do modal
  showModal = false;
  modalType: 'terms' | 'privacy' | null = null;

  constructor(private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name || !this.email || !this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.';
      return;
    }

    this.successMessage = 'Cadastro realizado com sucesso! Redirecionando...';

    const userData = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  // Abre o modal
  openModal(type: 'terms' | 'privacy', event: Event) {
    event.preventDefault();
    this.modalType = type;
    this.showModal = true;
  }

  // Fecha o modal
  closeModal() {
    this.showModal = false;
  }
}

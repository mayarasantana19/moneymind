import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private isBrowser: boolean;

  // Lista de usuários de teste (Hardcoded)
  private allowedUsers = [
    { username: 'admin', password: '123456' },
    { username: 'user', password: 'senha' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verifica se o código está sendo executado no navegador
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Se estiver no navegador, tenta restaurar o estado de login do localStorage
    if (this.isBrowser) {
        this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    }
  }

  login(username: string, password: string): boolean {
    // Encontra o usuário correspondente
    const user = this.allowedUsers.find(u => u.username === username && u.password === password);

    if (user) {
      this.loggedIn = true;
      
      // Persiste o estado SOMENTE se estiver no navegador
      if (this.isBrowser) {
        localStorage.setItem('loggedIn', 'true');
      }
      return true;
    }

    return false;
  }

  logout() {
    this.loggedIn = false;
    
    // Remove a persistência SOMENTE se estiver no navegador
    if (this.isBrowser) {
      localStorage.removeItem('loggedIn');
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      // No navegador: verifica o estado em memória OU o estado persistido
      return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
    }
    
    // No servidor (SSR): retorna apenas o estado em memória (false por padrão)
    return this.loggedIn; 
  }
}
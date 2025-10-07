import { Routes } from '@angular/router';
import { Painel } from './pages/painel/painel';
import { ControleGastos } from './pages/controle-gastos/controle-gastos';
import { SobreNos } from './pages/sobre-nos/sobre-nos';
 // Adicionado
import { AuthGuard } from './guards/auth.guard/auth.guard'; // Adicionado
import { Login } from './pages/login/login';
import { Calculadora } from './pages/calculadora/calculadora';
import { Aprender } from './pages/aprender/aprender';
import { Cadastro } from './pages/cadastro/cadastro';



export const routes: Routes = [
  // 1. Rota de LOGIN (Acessível publicamente)
  { path: 'login', component: Login },

  // 2. ROTAS PROTEGIDAS (Exigem que o usuário esteja logado via AuthGuard)
  { path: 'painel', component: Painel, canActivate: [AuthGuard] },

  { path: 'controle-gastos', component: ControleGastos, canActivate: [AuthGuard] },

  { path: 'aprender', component: Aprender, canActivate: [AuthGuard] },

  { path: 'calculadora', component: Calculadora, canActivate: [AuthGuard] },
  
  // Rota faltante: Tirar authGuard
  { path: 'sobre-nos', component: SobreNos},

  { path: 'cadastro', component: Cadastro },

  // 3. ROTA PADRÃO (Redireciona a raiz "/" para o login)
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' // Garante que só redireciona se o path for EXATAMENTE vazio
  },

  // 4. ROTA 404/FALLBACK (Redireciona qualquer URL desconhecida para o login)
  { path: '**', redirectTo: 'login' }
];
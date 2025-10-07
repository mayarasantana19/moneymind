import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// ------------------------------------------------------
// --- PASSO 1: REGISTRAR OS DADOS DO IDIOMA 'pt' ---
// ------------------------------------------------------
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'; 

// ESSENCIAL: Carrega os dados de formatação (vírgulas, pontos, R$) no Angular.
registerLocaleData(localePt, 'pt'); 
// --------------------------------------------------------

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

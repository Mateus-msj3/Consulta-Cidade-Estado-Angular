import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {CidadeEstadoModule} from "./shared/components/cidade-estado/cidade-estado.component";
import {HttpClientModule} from "@angular/common/http";
import {ConsultaComponent} from "./pages/consulta/consulta.component";
import {ClienteModule} from './pages/cliente/cliente.component';
import {ProdutoModule} from './pages/produto/produto.component';
import {PedidoComponent, PedidoModule} from './pages/pedido/pedido.component';



@NgModule({
  declarations: [
    AppComponent,
    ConsultaComponent,
  ],

  imports: [
    BrowserModule,
    CidadeEstadoModule,
    ClienteModule,
    ProdutoModule,
    PedidoModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

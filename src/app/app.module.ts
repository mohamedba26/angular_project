import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuteurModule } from './auteur/auteur.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditeurModule } from './editeur/editeur.module';
import { LivreModule } from './livre/livre.module';
import { SpecialiteModule } from './specialite/specialite.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import {CloudinaryModule} from '@cloudinary/ng';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuteurModule,
    EditeurModule,
    BrowserAnimationsModule,
    LivreModule,
    SpecialiteModule,
    AuthentificationModule,
    ShoppingCartModule,
    CloudinaryModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

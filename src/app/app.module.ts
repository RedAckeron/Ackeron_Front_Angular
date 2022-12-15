import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowQuestComponent } from './components/quest/show-quest/show-quest.component';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { FicheComponent } from './components/Character/fiche/fiche.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShowQuestComponent,
    MapComponent,
    FicheComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

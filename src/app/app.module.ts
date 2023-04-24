import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FicheComponent } from './components/Character/fiche/fiche.component';
import { CommonModule } from '@angular/common';
import { DungeonComponent } from './components/map/dungeon/dungeon.component';
import { MapComponent } from './components/map/mainland/map.component';
import { NgForInDirective } from './directive/ng-for-in/ng-for-in.directive';
import { ShowQuestComponent } from './components/Character/quest/show-quest/show-quest.component';
import { HomeComponent } from './components/home/home.component';
import { BattlegroundComponent } from './components/map/battleground/battleground.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShowQuestComponent,
    MapComponent,
    FicheComponent,
    DungeonComponent,
    NgForInDirective,
    HomeComponent,
    BattlegroundComponent,
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

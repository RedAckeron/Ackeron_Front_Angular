import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FicheComponent } from './components/Character/fiche/fiche.component';
import { ShowQuestComponent } from './components/Character/quest/show-quest/show-quest.component';
import { HomeComponent } from './components/home/home.component';
import { BattlegroundComponent } from './components/map/battleground/battleground.component';
import { DungeonComponent } from './components/map/dungeon/dungeon.component';
import { MapComponent } from './components/map/mainland/map.component';

const routes: Routes = [
  { path: "", component : HomeComponent },
  { path: "charpanel",component : FicheComponent},
  { path: "map", component : MapComponent },
  { path: "dungeon", component : DungeonComponent },
  { path: "battleground", component:BattlegroundComponent},
  { path: "quest", component : ShowQuestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { ShowQuestComponent } from './components/quest/show-quest/show-quest.component';

const routes: Routes = [
  { path: "", component : HomeComponent },
  { path: "map", component : MapComponent },
  { path: "quest", component : ShowQuestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

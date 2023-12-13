import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { authGuard } from '../authentification/auth.guard';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'specialites', redirectTo: 'specialites/index', pathMatch: 'full' },
  { path: 'specialites/index', component: IndexComponent ,canActivate: [authGuard]},
  { path: 'specialites/create', component: CreateComponent },
  { path: 'specialites/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialiteRoutingModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //{path: '',  redirectTo: '/auth/login', pathMatch: 'full'},
  //{path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import { RegisterComponent } from './register/register.component';
import {NavbarComponent} from './navbar/navbar.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'quiz', component:QuizComponent, canActivate: [AuthGuard]},
  {path:'result', component:ResultComponent, canActivate: [AuthGuard]},
  {path:'', redirectTo:'register', pathMatch:'full'},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: true}  // <-- debugging purpose only.
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AppComponent,
  RegisterComponent,
  NavbarComponent,
  QuizComponent,
  ResultComponent,
  PageNotFoundComponent
]

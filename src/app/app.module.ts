import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main.component';
import { EmotionComponent } from './components/emotion.component';
import { PostListComponent } from './components/post-list.component';
import { LoginComponent } from './components/login.component';
import { PostComponent } from './components/post.component';
import { Routes, RouterModule } from '@angular/router';
import { FeelingService } from './feeling.service';
import { RegisterComponent } from './components/register.component';
import { LoggedUserComponent } from './components/logged-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavComponent } from './components/nav.component';
import { AuthInterceptor } from './auth.interceptor';
import { ForgotComponent } from './components/forgot.component';

const appRoutes: Routes = [
  { path: "", component: MainComponent, title: "Main" },
  { path: "emotion/:label", component: EmotionComponent, title: "Emotion"},
  { path: "postlist", component: PostListComponent, title: "Post list"},
  { path: "post", component: PostComponent, title: "Post"},
  { path: "login", component: LoginComponent, title: "Login"},
  { path: "register", component: RegisterComponent, title: "Register"},
  { path: "forgot", component: ForgotComponent, title: "Forgot password"}

]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EmotionComponent,
    PostListComponent,
    LoginComponent,
    PostComponent,
    RegisterComponent,
    LoggedUserComponent,
    NavComponent,
    ForgotComponent
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true,  enableTracing: true } ),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    FeelingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

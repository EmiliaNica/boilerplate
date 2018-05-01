import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { userService } from './userService.service';
import { HttpClientModule } from '@angular/common/http';
import { courseService } from './courseService.service';
import { recordService } from './recordService.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    PagesModule,
    AuthModule,
    BrowserModule,
    ClarityModule,
    HttpClientModule
  ],
  providers: [userService, courseService, recordService],
  bootstrap: [AppComponent]
})
export class AppModule { }

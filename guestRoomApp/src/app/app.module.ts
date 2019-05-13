import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule}from '@angular/common/http'

import "hammerjs";
import { HeaderComponent } from "./components/header/header.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {MatInputModule} from '@angular/material/input';

import { componentsRoutes } from "./app-routing.module";
@NgModule({
  declarations: [AppComponent, HeaderComponent, componentsRoutes],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

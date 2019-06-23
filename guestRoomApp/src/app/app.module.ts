import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule}from '@angular/common/http'
import {MatSelectModule} from '@angular/material/select';
import "hammerjs";
import {MatCardModule} from '@angular/material/card';
 
import { HeaderComponent } from "./components/header/header.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {MatInputModule} from '@angular/material/input';
import { componentsRoutes } from "./app-routing.module";
import { CreateComponent } from './components/create/create.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule,MatProgressSpinnerModule} from '@angular/material';
@NgModule({
  declarations: [AppComponent, HeaderComponent, componentsRoutes, CreateComponent],
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
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

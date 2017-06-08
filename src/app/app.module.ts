import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { alertReducer } from './reducer/alert.reducer';
import { StoreModule } from '@ngrx/store';
import { AlertComponent } from './components/alert-component/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({ alert: alertReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

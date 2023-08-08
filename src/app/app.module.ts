import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { DateValidationDirective } from './validation/date-validation.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoCreateComponent,
    DateValidationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

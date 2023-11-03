import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreenComponent } from './components/screen/screen.component';
import { ButtonComponent } from './components/button/button.component';
import { AppRoutingModule } from './app-routing.module';
import { DisplayComponent } from './components/display/display.component';
import { NumberTransformPipe } from './pipes/number-transform.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    ButtonComponent,
    DisplayComponent,
    NumberTransformPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

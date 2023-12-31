import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenComponent } from './components/screen/screen.component';

const routes: Routes = [
  { path: 'main', component: ScreenComponent },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

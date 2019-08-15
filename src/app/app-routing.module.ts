import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PhotoComponent } from './photo/photo.component';


const appRoutes: Routes = [

  { path: '',   redirectTo: '/map', pathMatch: 'full' },
  {
    path: 'photo',
    component: PhotoComponent
  }
//   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CourseDataService} from './services/course-data.service';
import {RouterModule, Routes} from '@angular/router';
import {AcademicTrackComponent} from './components/academic-track/academic-track.component';
import {AcademicTrackListComponent} from './components/academic-track-list/academic-track-list.component';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: AcademicTrackListComponent},
  {path: ':academicTrackOid', component: AcademicTrackComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AcademicTrackComponent,
    AcademicTrackListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true, paramsInheritanceStrategy: 'always'})
  ],
  providers: [CourseDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

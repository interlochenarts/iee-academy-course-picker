import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CourseDataService} from './services/course-data.service';
import {RouterModule, Routes} from '@angular/router';
import {AcademicTrackComponent} from './components/academic-track/academic-track.component';
import {FormsModule} from '@angular/forms';
import {ModalContainerComponent} from './modal-container/modal-container.component';
import {ModalService} from './services/modal.service';
import { TranscriptQuestionsComponent } from './transcript-questions/transcript-questions.component';

const appRoutes: Routes = [
  {path: ':educationId', component: AcademicTrackComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AcademicTrackComponent,
    ModalContainerComponent,
    TranscriptQuestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true, paramsInheritanceStrategy: 'always'})
  ],
  providers: [CourseDataService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

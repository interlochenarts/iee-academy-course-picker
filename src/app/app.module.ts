import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CourseDataService} from './services/course-data.service';
import {RouterModule, Routes} from '@angular/router';
import {AcademicTrackComponent} from './components/academic-track/academic-track.component';
import {FormsModule} from '@angular/forms';
import {ModalContainerComponent} from './components/modal-container/modal-container.component';
import {ModalService} from './services/modal.service';
import {TranscriptQuestionsComponent} from './components/transcript-questions/transcript-questions.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReviewAndSubmitComponent} from './components/academic-track/review-and-submit/review-and-submit.component';
import {AlternatesComponent} from './components/academic-track/alternates/alternates.component';
import {TrackSelectionsComponent} from './components/academic-track/track-selections/track-selections.component';
import { CourseCheckboxComponent } from './components/academic-track/course-checkbox/course-checkbox.component';

const appRoutes: Routes = [
  {path: ':educationId', component: AcademicTrackComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AcademicTrackComponent,
    ModalContainerComponent,
    TranscriptQuestionsComponent,
    ReviewAndSubmitComponent,
    AlternatesComponent,
    TrackSelectionsComponent,
    CourseCheckboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true, paramsInheritanceStrategy: 'always'})
  ],
  providers: [CourseDataService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

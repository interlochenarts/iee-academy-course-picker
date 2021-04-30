import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import { RequestListComponent } from './components/academic-track/review-and-submit/request-list/request-list.component';
import { ReviewAlertMessageComponent } from './components/academic-track/review-and-submit/review-alert-message/review-alert-message.component';

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
    CourseCheckboxComponent,
    RequestListComponent,
    ReviewAlertMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true, paramsInheritanceStrategy: 'always', relativeLinkResolution: 'legacy' })
  ],
  providers: [CourseDataService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

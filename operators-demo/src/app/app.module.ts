import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwitchMapDemoComponent } from './components/switch-map-demo/switch-map-demo.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ForkJoinDemoComponent } from './components/fork-join-demo/fork-join-demo.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { CombiningOperatorsComponent } from './components/combining-operators/combining-operators.component';
import { AutoscrollDirective } from './directives/autoscroll.directive';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
  declarations: [AppComponent, SwitchMapDemoComponent, ForkJoinDemoComponent, SandboxComponent, CombiningOperatorsComponent, AutoscrollDirective, TimelineComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMasonryModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [
    MatSnackBarModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

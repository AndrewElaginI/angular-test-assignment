import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicVideosComponent } from './music-videos.component';
import { AgGridModule } from 'ag-grid-angular';
import { MusicVideosRoutingModule } from './music-videos-routing.module';

@NgModule({
  imports: [CommonModule, AgGridModule.withComponents([]), MusicVideosRoutingModule],
  exports: [MusicVideosComponent],
  declarations: [MusicVideosComponent],
})
export class MusicVideosModule {}

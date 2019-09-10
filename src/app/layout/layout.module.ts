import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MusicVideosModule } from './music-videos/music-videos.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, MusicVideosModule],
  declarations: [LayoutComponent],
})
export class LayoutModule {}

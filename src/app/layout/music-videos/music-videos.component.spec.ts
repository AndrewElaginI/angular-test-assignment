import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicVideosComponent } from './music-videos.component';
import { AgGridModule } from 'ag-grid-angular';
import { VideosService } from '../../services/videos/videos.service';
import { of as observableOf } from 'rxjs/observable/of';

describe('MusicVideosComponent', () => {
  let component: MusicVideosComponent;
  let fixture: ComponentFixture<MusicVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AgGridModule.withComponents([])],
      declarations: [MusicVideosComponent],
      providers: [
        {
          provide: VideosService,
          useValue: {
            getData: () => observableOf([]),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

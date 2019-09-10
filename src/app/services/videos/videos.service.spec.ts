import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { VideosService } from './videos.service';
import { HttpClient } from '@angular/common/http';
import { of as observableOf } from 'rxjs/observable/of';
import * as moment from 'moment';

const mockResponse = [
  {
    etag: '8jEFfXBrqiSrcF6Ee7MQuz8XuAM/QtJ4MlYKdN_zTBjfY3xY6mn7ZRg',
    id: { kind: 'youtube#video', videoId: '3fumBcKC6RE' },
    kind: 'youtube#searchResult',
    snippet: {
      title: 'Lil Wayne - John (Explicit) ft. Rick Ross',
      channelId: 'UCEOhcOACopL42xyOBIv1ekg',
      channelTitle: 'LilWayneVEVO',
      description: 'Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.',
      liveBroadcastContent: 'none',
      publishedAt: '2011-05-12T20:01:31.000Z',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg', height: 90, width: 120 },
      },
    },
  },
];

describe('VideoServices', () => {
  let videosService: VideosService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        VideosService,
        {
          provide: HttpClient,
          useValue: {
            get: url => observableOf(mockResponse), // check up for payload correctness
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    videosService = getTestBed().get(VideosService);
  });

  it('should create', () => {
    expect(videosService).toBeTruthy();
  });

  it('getData: should return mapped data', () => {
    const { snippet, id } = mockResponse[0];

    videosService.getData().subscribe(data => {
      expect(data).toEqual([
        {
          thumbnails: { url: snippet.thumbnails.default.url, toString: () => snippet.title },
          publishedAt: moment(snippet.publishedAt)
            .local()
            .format('DD MMM YYYY HH:mm'),
          title: snippet.title,
          description: snippet.description,
          id,
        },
      ]);
    });
  });
});

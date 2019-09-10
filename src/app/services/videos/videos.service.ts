import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { catchError, map } from 'rxjs/operators';
import * as moment from 'moment';
import { ITableItem } from './videos.models';

@Injectable()
export class VideosService {
  url =
    'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john';
  constructor(private http: HttpClient) {}

  getData(): Observable<ITableItem[]> {
    return this.http.get(this.url).pipe(
      map(({ items }: any) =>
        items.map(({ id, snippet: { publishedAt, title, description, thumbnails } }) => ({
          thumbnails: { url: thumbnails.default.url, toString: () => title },
          publishedAt: moment(publishedAt)
            .local()
            .format('DD MMM YYYY HH:mm'),
          title,
          description,
          id: id.videoId,
        })),
      ),
      catchError(err => {
        console.log(err);
        return Observable.empty();
      }),
    );
  }
}

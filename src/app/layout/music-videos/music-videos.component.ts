import { Component, OnInit } from '@angular/core';
import 'ag-grid-enterprise';
import { Observable } from 'rxjs/Observable';
import { VideosService } from '../../services/videos/videos.service';
import { ITableItem } from '../../services/videos/videos.models';

@Component({
  selector: 'app-music-videos',
  templateUrl: './music-videos.component.html',
  styleUrls: ['./music-videos.component.css'],
})
export class MusicVideosComponent implements OnInit {
  private columnDefs: any[];
  gridOptions: { [key: string]: any };
  rowData: Observable<ITableItem[]>;

  constructor(private videosService: VideosService) {
    this.columnDefs = [
      {
        headerName: '',
        field: 'checkbox',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 60,
      },
      {
        headerName: '',
        field: 'thumbnails',
        cellRenderer: params => `<img src="${params.value.url}" />`,
        width: 200,
        rowDrag: true,
      },
      {
        headerName: 'Published at',
        field: 'publishedAt',
        sortable: true,
        filter: true,
        width: 160,
      },
      {
        headerName: 'Title',
        field: 'title',
        sortable: true,
        filter: true,
        width: 400,
      },
      {
        headerName: 'Description',
        field: 'description',
        sortable: true,
        filter: true,
        suppressSizeToFit: true,
      },
    ];

    this.gridOptions = {
      defaultColDef: {
        resizable: true,
      },
      columnDefs: this.columnDefs,
      rowHeight: 80,
      enableRangeSelection: true,
      getMainMenuItems: this.getMainMenuItems,
      getContextMenuItems: this.getContextMenuItems,
      allowContextMenuWithControlKey: true,
      rowDragManaged: true,
      animateRows: true,
    };
  }

  ngOnInit(): void {
    this.rowData = this.videosService.getData();
  }

  private getMainMenuItems(params): any[] {
    const countTotal = params.api.paginationProxy.pageSize;
    const seletedItemsCount = params.api.getSelectedRows().length;

    return [
      'pinSubMenu',
      'separator',
      {
        name: `Total: ${countTotal}`,
      },
      {
        name: `Selected ${seletedItemsCount}`,
      },
    ];
  }

  private getContextMenuItems(params): any[] {
    if (params.column.colId !== 'title') {
      return [];
    }

    const result = [
      'copy',
      'copyWithHeaders',
      'separator',
      {
        name: 'Open in new tab',
        action: function() {
          const videoId = params.node.data.id;
          window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        },
        icon: '<i class="fas fa-external-link-alt"></i>',
      },
    ];

    return result;
  }
}

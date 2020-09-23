import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public no_paginate;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Temas';
    this.no_paginate = true;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var search = params['search'];
      this.page_title = this.page_title + ' ' + search;
      this.getTopics(search);
    });
  }

  getTopics(search) {
    this._topicService.search(search).subscribe(
      response => {
        this.topics = response.topics;
      },
      error => {
        console.log(error);
      }
    );
  }

}
 
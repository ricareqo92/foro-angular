import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {

  public page_title: string;
  public topics: Array<Topic>;
  public status: string;
  public identity;
  public token;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _topicService: TopicService,
  ) {
    this.page_title = 'Crear nuevo tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getTopicsByUser();
  }

  getTopicsByUser() {
    let userId = this.identity._id;
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if ( response.topics ) {
          this.topics = response.topics;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTopic(id) {
    this._topicService.delete(this.token, id).subscribe(
      response => {
        this.getTopicsByUser();
      },
      error => {
        console.log(error);
        
      }
    );
  }

}

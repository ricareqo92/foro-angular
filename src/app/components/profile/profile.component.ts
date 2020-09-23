import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from '../../services/global';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {

  public user: User;
  public topics: Topic[];
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.url = global.url;
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let userId = params['id'];
      this.getUser(userId);
      this.getTopics(userId);
    });
  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if ( response.user ) {
          this.user = response.user;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getTopics(userId) {
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

}

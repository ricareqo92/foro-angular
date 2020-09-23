import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]

})
export class EditComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public status: string;
  public identity;
  public token;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _topicService: TopicService,
  ) {
    this.page_title = 'Editar tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    this.is_edit = true;
  }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._topicService.getTopic(id).subscribe(
        response => {
          if ( !response.topic ) {
            this._router.navigate(['/panel']);
          } else {
            this.topic = response.topic;
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(editTopic) {
    this._topicService.update(this.token, this.topic._id, this.topic).subscribe(
      response => {
        if ( response.topic ) {
          this.status = 'success';
          this.topic = response.topic;
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
  public status: string;
  public identity;
  public token;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _topicService: TopicService,
  ) { }

  ngOnInit() {
    this.page_title = 'Crear nuevo tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  onSubmit(addTopic) {
    this._topicService.addTopic(this.token, this.topic).subscribe(
      response => {
        if ( response.topic ) {
          this.status = 'success';
          this.topic = response.topic;
          this._router.navigate(['/panel']);
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

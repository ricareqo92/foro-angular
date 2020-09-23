import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;
  public comment: Comment;
  public identity;
  public token;
  public status: string;
  public url;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);
    this.url = global.url;
  }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._topicService.getTopic(id).subscribe(
        response => {
          if ( response.topic ) {
            this.topic = response.topic;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(form) {
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response => {
        if ( response.topic ) {
          this.status = 'success';
          this.topic = response.topic;
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteComment(id) {
    this._commentService.delete(this.token, this.topic._id, id).subscribe(
      response => {
        if ( response.topic ) {
          this.topic = response.topic;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}

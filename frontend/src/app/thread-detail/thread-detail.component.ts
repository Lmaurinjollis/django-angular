import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/thread.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {

  currentThread = null;
  message = '';

  constructor(private threadService: ThreadService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getThread(this.route.snapshot.paramMap.get('id'));
  }

  getThread(id) {
    this.threadService.get(id).subscribe(
      data => {
        this.currentThread = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updatePublished(status) {
    const data = {
      title: this.currentThread.title,
      description: this.currentThread.description,
      published: status
    };

    this.threadService.update(this.currentThread.id, data).subscribe(
      response => {
        this.currentThread.published = status;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateThread() {
    this.threadService.update(this.currentThread.id, this.currentThread).subscribe(
      response => {
        console.log(response);
        this.message = 'The thread was updated successfully!';
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteThread() {
    this.threadService.delete(this.currentThread.id).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/threads']);
      },
      error => {
        console.log(error);
      }
    );
  }

}

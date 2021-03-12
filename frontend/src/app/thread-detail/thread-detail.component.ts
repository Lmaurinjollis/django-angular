import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/thread.service';
// We will reroute our user when they delete a thread
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
    // get the id of the current thread we want to edit
    this.getThread(this.route.snapshot.paramMap.get('id'));
  }

  // get the thread by id
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

  // Update the published field of a thread
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

  // Update a thread with the current data in the form and display a message
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

  // Delete the thread
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

import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  threads: any;
  currentThread = null;
  currentIndex = -1;

  // constructor get a thread service instance to get all threads
  constructor(private threadService: ThreadService) { }

  // On this component init we want to get all threads
  ngOnInit(): void {
    this.getThreads();
  }


  getThreads(){
    // We subscribe to this service for asynchronous request
    this.threadService.getAll().subscribe(
      data => {
        this.threads = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  // We reset the selected thread and the list on a change
  refreshList() {
    this.getThreads();
    this.currentThread = null;
    this.currentIndex = -1;
  }

  // Select a thread that we want to edit
  setActiveThread(thread, index) {
    this.currentThread = thread;
    this.currentIndex = index;
  }

  // When the remove all button is clicked we delete every thread in the DB
  removeAllThreads() {
    this.threadService.deleteAll().subscribe(
      response => {
        console.log(response);
        this.getThreads();
      },
      error => {
        console.log(error);
      }
    );
  }
}

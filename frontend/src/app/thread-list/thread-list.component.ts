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

  constructor(private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(){
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

  refreshList() {
    this.getThreads();
    this.currentThread = null;
    this.currentIndex = -1;
  }

  setActiveThread(thread, index) {
    this.currentThread = thread;
    this.currentIndex = index;
  }

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

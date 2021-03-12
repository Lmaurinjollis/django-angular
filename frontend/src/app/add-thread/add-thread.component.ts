import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/thread.service';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.css']
})
export class AddThreadComponent implements OnInit {

  // Represent a thread as in the DB
  thread = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private threadService: ThreadService) { }

  ngOnInit(): void {
  }

  saveThread(){
    const data = {
      title: this.thread.title,
      description: this.thread.description
    };

    this.threadService.create(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  resetForm(){
    this.submitted = false;
    this.thread = {
      title: '',
      description: '',
      published: false
    };
  }

}

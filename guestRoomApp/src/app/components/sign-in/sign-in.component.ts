import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    document.getElementById("sign-in-page-container").style.height =
      window.innerHeight + "px";
  }

}

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor() {}
  _homeImages: { name: string; src: string }[] = [
    { name: "mountain", src: "../../../assets/images/room3.jpeg" },
    { name: "suit", src: "../../../assets/images/room2.jpeg" },
    { name: "home in the village", src: "../../../assets/images/room1.jpeg" }
  ];
  ngOnInit() {
    document.getElementById("home-page-container").style.height =
      window.innerHeight + "px";
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { AdminService } from "../create/admin.service";
import { Room } from "../create/room.model";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.roomSub.unsubscribe();
  }
  rooms: Room[] = [];
  roomSub: Subscription;
  totalRooms = 0;
  roomsPerPage = 3;
  currentPage = 1;
  isLoading = false;
  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getRooms(this.roomsPerPage, this.currentPage);
    this.isLoading=true;

    this.roomSub = this.adminService
      .getRoomsUpdatedListener()
      .subscribe((roomsData: { rooms: Room[]; maxRooms: number }) => {
        console.log(roomsData);
        this.isLoading=false
        this.rooms = roomsData.rooms;
        this.totalRooms = roomsData.maxRooms;
      });
      console.log(this.rooms)
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1; // +1 bc its start at 0
    this.roomsPerPage = pageData.pageSize;
    this.adminService.getRooms(this.roomsPerPage, this.currentPage);
    console.log(pageData);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Room } from './room.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
ADMIN_URL="http://localhost:5000/api/room"
rooms:Room[]=[];
roomsUpdated=new Subject<{ rooms: Room[]; maxRooms: number }>()
  constructor(public http:HttpClient) { }
  createRoom(room:any){
    const roomData = new FormData();
    roomData.append("roomName", room.roomName);
    roomData.append("roomDescription", room.roomDescription);
    roomData.append("roomPrice", room.roomPrice);
    roomData.append("roomImage",room.roomImage);
    roomData.append("bedsAmount", room.bedsAmount);
    roomData.append("roomBedType", room.roomBedType);
    roomData.append("isRoomAvailable", room.isRoomAvailable);
 
    this.http.post(this.ADMIN_URL+"/create",roomData).subscribe(response=>{
      console.log(response)
    })
  }
  getRoomsUpdatedListener(){
    return this.roomsUpdated.asObservable()
  }
  getRooms(roomsPerPage: number, currentPage: number){
    const queryParams = `?pagesize=${roomsPerPage}&page=${currentPage}`;

    this.http.get<{ message: string; rooms: any; maxRooms: number }>(this.ADMIN_URL+queryParams).subscribe(result=>{
      this.rooms=result.rooms;
      console.log(result)
      this.roomsUpdated.next({
        rooms: [...this.rooms],
        maxRooms: result.maxRooms
      });
    })
  }
}

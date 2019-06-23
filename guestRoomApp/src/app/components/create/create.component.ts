import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "../sign-up/mime.type.validator";
import { AdminService } from './admin.service';
import { Room } from './room.model';

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  imagePreview;
  constructor(public adminService:AdminService) {}

  ngOnInit() {

    this.form = new FormGroup({
      roomName: new FormControl("", { validators: Validators.required }),
      roomDescription: new FormControl("", { validators: Validators.required }),
      roomPrice: new FormControl("", { validators: Validators.required }),
      roomImage: new FormControl("", {
        validators: [Validators.required],
        asyncValidators: mimeType
      }),
      bedsAmount: new FormControl("", { validators: [Validators.required] }),
      roomBedType: new FormControl("", { validators: [Validators.required] }),
      isRoomAvailable: new FormControl("", {})
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ roomImage: file }); //allow to patch a single control
    this.form.get("roomImage").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
  onSubmit() {
    if (this.form.invalid) return;
    console.log(this.form);
    const roomData = new FormData();
    const room={
      roomName:this.form.value.roomName,
      roomDescription:this.form.value.roomDescription,
      roomPrice:this.form.value.roomPrice,
      roomImage:this.form.value.roomImage,
      bedsAmount:this.form.value.bedsAmount,
      roomBedType:this.form.value.roomBedType,
      isRoomAvailable:this.form.value.isRoomAvailable
    }
    console.log("egr")
    this.adminService.createRoom(room)
   // this.form.reset();
    return false;
  }
}

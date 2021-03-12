import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {
  SERVER_URL!: "http://localhost:8080/lives";  
  liveForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName:['',[Validators.required]],
      channelName:['',[Validators.required]],
      liveLink:['',[Validators.required]],
      liveDate:['',[Validators.required]],
      liveTime:['',[Validators.required]],
    });
  }

  createLive(){
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveForm.value.liveTime;
    this.rest.postLives(this.liveForm.value).subscribe(result => {
      console.log(this.liveForm);
    });
    this.dialogRef.close();
    this.liveForm.reset()
  }

  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset()
  }
}

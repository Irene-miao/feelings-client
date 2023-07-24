import { Component,  OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeelingService } from '../feeling.service';
import { Emotion, Music } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css']
})
export class EmotionComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute)
  feelingSvc = inject(FeelingService)
label: string = ''
emotion$!: Observable<Emotion>
musicArr: Music[] = []

  ngOnInit(): void {
      const label = this.activatedRoute.snapshot.params["label"]
     this.label = label
    this.emotion$ = this.feelingSvc.getEmotion(label)

  this.emotion$.subscribe(
    v => {
      this.musicArr = v.music
    }
  )
  }

  

}

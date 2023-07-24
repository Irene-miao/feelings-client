import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from '../models';
import { FeelingService } from '../feeling.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.css']
})
export class LoggedUserComponent implements OnInit {
  feelingSvc = inject(FeelingService)
  @Input()user!: User
  picture: string | ArrayBuffer | null | undefined
deleteUser$ !: Observable<any>
router = inject(Router)


  ngOnInit(): void {
    console.warn(this.user)
   this.picture = this.user?.avatar_img
  }


  logout() {
    this.feelingSvc.logout()
    this.router.navigate(['/login'])
  }

  deleteUser(username: string){
    console.info(username)
    this.deleteUser$ = this.feelingSvc.deleteUser(username);
    this.deleteUser$.subscribe(v => 
      console.info(v))
this.router.navigate(['/login'])
  }
}

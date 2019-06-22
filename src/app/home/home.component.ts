import { Component, OnInit } from '@angular/core';
import { TokensService } from '../core/services/tokens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  static URL = "home";

  constructor(
    private tokensService: TokensService,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.tokensService.logout();
  }

}

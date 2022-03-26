import { Component } from '@angular/core';
import { LoadingService } from './utils/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';

  constructor(public loadingService:LoadingService){    
  }
}

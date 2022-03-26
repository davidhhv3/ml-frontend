import {ApplicationRef, ChangeDetectorRef, Injectable, NgZone} from '@angular/core';
export enum LoadingColors {
  ORANGE = '#c58511',
  BLUE = 'rgb(24, 227, 242)',
  WHITE = 'white'
}
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  get loading(): boolean {
    return this._loading;
  }
  get loadingColor(): string {
    return this._loadingColor;
  }
  constructor() {
  }
  public readonly ngxLoadingAnimationTypes = {
    chasingDots: 'chasing-dots',
    circle: 'sk-circle',
    circleSwish: 'circleSwish',
    cubeGrid: 'sk-cube-grid',
    doubleBounce: 'double-bounce',
    none: 'none',
    pulse: 'pulse',
    rectangleBounce: 'rectangle-bounce',
    rotatingPlane: 'rotating-plane',
    threeBounce: 'three-bounce',
    wanderingCubes: 'wandering-cubes'
  };
  private _loading = false;
  private _loadingColor = LoadingColors.BLUE;
  public setLoading(status: boolean, color: LoadingColors = LoadingColors.BLUE) {
    setTimeout(() => {
      // console.log('['+Date.now()+']',"prev",this._loading,'change', status);
      this._loading = status;
      this._loadingColor = color;
    },1);
  }
}

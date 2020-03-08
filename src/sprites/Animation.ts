/// <reference path="../Constants.ts" />

namespace TSEngine {
    export class Animation {
        private _name: string;
        private _imageAtlas : HTMLImageElement;
        private _frames : Frame[];
        private _currentFrame : Frame;
        private _currentFrameIndex : number;
        private _isStarted : Boolean;
        private _currentFrameTime : number;
        private _playedOnce : boolean;

        public constructor(name: string, imageAtlas : HTMLImageElement, framesJsonList) {
            this._name = name;
            this._imageAtlas = imageAtlas;
            this._frames = [];
            this._isStarted = false;
            this._currentFrameIndex = 0;
            this._playedOnce = false;

            this.importJsonAnimation(framesJsonList);
        }

        public get name() : string {
            return this._name;
        }

        public get playedOnce() : boolean {
            return this._playedOnce;
        }

        public get width() : number {
            return this._frames.length > 0 ? this._frames[0].w : 0;
        }

        public get height() : number {
            return this._frames.length > 0 ? this._frames[0].h : 0;
        }

        private importJsonAnimation(framesJsonList) {
            for (let f = 0; f < framesJsonList.length; f++) {
                this._frames.push(new Frame(this, framesJsonList[f]));
            }
        }

        public start() {
            this._currentFrame = this._frames[0];
            this._currentFrameIndex = 0;
            this._currentFrameTime = 0;
            this._isStarted = true;
        }

        public stop() {
            this._isStarted = false;
            this._playedOnce = false;
        }

        public update() {
            if (this._isStarted) {
                this._currentFrameTime += TICK_IN_MS;
                if (this._currentFrameTime >= this._currentFrame.duration) {
                    this._currentFrameIndex = this._currentFrameIndex - 1 == this._frames.length ? 0 : this._currentFrameIndex + 1;
                    this._currentFrame = this._frames[this._currentFrameIndex];

                    if (this._currentFrameIndex == 0)
                        this._playedOnce = true;
                }
            }
        }

        public draw(ctx : CanvasRenderingContext2D, screenLocation : Vector2) {
            ctx.drawImage(this._imageAtlas, this._currentFrame.x, this._currentFrame.y, 
                this._currentFrame.w, this._currentFrame.h, screenLocation.x, screenLocation.y, this._currentFrame.w, this._currentFrame.h);
        }
    }
}
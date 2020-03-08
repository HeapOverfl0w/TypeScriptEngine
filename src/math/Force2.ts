/// <reference path="../Constants.ts" />

namespace TSEngine {
    export class Force2 extends Vector2 {
        private _ms : number;
        private _currentMs : number;
        private _isConstantSlow : boolean;

        public constructor(x : number, y : number, ms : number, isConstantSlow : boolean){
            super(x, y);
            this._ms = ms;
            this._currentMs = ms;
            this._isConstantSlow = isConstantSlow;
        }

        public get currentTime() : number {
            return this._currentMs;
        }

        public get time() : number {
            return this._ms;
        }

        public set time(ms : number) {
            this._ms = ms;
        }

        public get isConstantSlow() : boolean {
            return this._isConstantSlow;
        }

        public set isConstantSlow(isConstantSlow : boolean){
            this._isConstantSlow = isConstantSlow;
        }

        public update() {
            if (this._currentMs > 0)
                this._currentMs -= TICK_IN_MS;

            if (!this._isConstantSlow) {
                let newDistance = this.distance * (this._ms / this._currentMs);
                let normalized = this.normalize();
                this.x = normalized.x * newDistance;
                this.y = normalized.y * newDistance;
            }
        }
    }
}
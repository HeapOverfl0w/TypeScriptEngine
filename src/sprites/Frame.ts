namespace TSEngine {
    export class Frame {
        private _x:number;
        private _y:number;
        private _w:number;
        private _h:number;
        private _duration:number;
        private _parent:Animation;

        public constructor(parent: Animation, frameJsonObject){
            this._x = frameJsonObject.frame.x;
            this._y = frameJsonObject.frame.y;
            this._w = frameJsonObject.frame.w;
            this._h = frameJsonObject.frame.h;
            this._duration = frameJsonObject.duration;

            this._parent = parent;
        }

        public get x() : number {
            return this._x;
        }

        public get y() : number {
            return this._y;
        }

        public get w() : number {
            return this._w;
        }

        public get h() : number {
            return this._h;
        }

        public get duration() : number {
            return this._duration;
        }

        public get parent() : Animation {
            return this._parent;
        }
    }
}
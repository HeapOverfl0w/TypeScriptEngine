namespace TSEngine {
    export class Vector2 {
        private _x: number;
        private _y: number;

        public constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        public get x() : number {
            return this._x;
        }

        public set x(value : number) {
            this._x = value;
        }

        public get y() : number {
            return this._x;
        }

        public set y(value : number) {
            this._x = value;
        }

        public get distance() : number {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        }

        public normalize() : Vector2 {
            let distance : number = this.distance;
            return new Vector2(this._x / distance, this._y / distance);
        }

        public add(v : Vector2) {
            this._x += v.x;
            this._y += v.y;
        }

        public subtract(v : Vector2) {
            this._x -= v.x;
            this._y -= v.y;
        }

        public multiply(v: Vector2) {
            this._x *= v.x;
            this._y *= v.y;
        }

        public divide(v: Vector2) {
            this._x /= v.x;
            this._y /= v.y;
        }

        public static add(v1 : Vector2, v2:Vector2) : Vector2 {
            return new Vector2(v1.x + v2.x, v1.y + v2.y);
        }

        public static subtract(v1 : Vector2, v2:Vector2) : Vector2 {
            return new Vector2(v1.x - v2.x, v1.y - v2.y);
        }

        public static multiply(v1: Vector2, v2:Vector2) : Vector2 {
            return new Vector2(v1.x * v2.x, v1.y * v2.y);
        }

        public static divide(v1: Vector2, v2:Vector2) : Vector2 {
            return new Vector2(v1.x / v2.x, v1.y / v2.y);
        }
    }
}
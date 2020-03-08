namespace TSEngine {
    export class Rectangle {

        private _location : Vector2;
        private _width : number;
        private _height : number;

        public constructor(location : Vector2, width : number, height : number) {
            this._location = location;
            this._width = width;
            this._height = height;
        }

        public get location() : Vector2 {
            return this._location;
        }

        public set location(location : Vector2) {
            this._location = location;
        }

        public get width() : number {
            return this._width;
        }

        public set width(width:number) {
            this._width = width;
        }

        public get height() : number {
            return this._height;
        }

        public set height(height:number) {
            this._height = height;
        }

        public intersects(rect:Rectangle) : boolean {
            let l1 = this.location;
            let r1 = new Vector2(this.location.x + this.width, this.location.y + this.height);

            let l2 = rect.location;
            let r2 = new Vector2(rect.location.x + rect.width, rect.location.y + rect.height);

            if (l1.x > r2.x || l2.x > r1.x)
                return false;
            if (l1.y < r2.y || l2.y < r1.y)
                return false;

            return true;
        }

        public draw(ctx : CanvasRenderingContext2D, cameraViewRect : Rectangle) {
            if (cameraViewRect.intersects(this)) {
                let screenCoords = new Vector2(this.location.x - cameraViewRect.location.x, this.location.y - cameraViewRect.location.y)
                ctx.fillStyle = RECT_WIREFRAME_COLOR;
                ctx.rect(screenCoords.x, screenCoords.y, this.width, this.height);
            }
        }
    }
}
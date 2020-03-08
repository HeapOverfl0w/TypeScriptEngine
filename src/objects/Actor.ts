namespace TSEngine {
    class Actor {
        private _animations : Animation[];
        private _currentAnimation : Animation;
        private _forces : ForceCollection;
        private _name : string;
        private _location : Vector2;
        private _boundingRect : Rectangle;

        public constructor(name : string, x : number, y : number, isMoveable : boolean, animations : Animation[] = []) {
            if (isMoveable)
                this._forces = new ForceCollection();
            else
                this._forces = undefined;

            this._animations = animations;
            if (this._animations.length > 0){
                this._currentAnimation = this._animations[0];
                this._boundingRect = new Rectangle(this._location, this._currentAnimation.width, this._currentAnimation.height);
            }
            else {
                this._currentAnimation = undefined;
                this._boundingRect = new Rectangle(this._location, 0, 0);
            }
            this._name = name;
            this._location = new Vector2(x, y);
        }

        public get forces() : ForceCollection {
            return this._forces;
        }

        public get name() : string {
            return this._name;
        }

        public set name(name:string) {
            this._name = name;
        }

        public get location() : Vector2 {
            return this._location;
        }

        public set location(location:Vector2) {
            this._location = location;
        }

        public get animations() : Animation[] {
            return this._animations;
        }

        //starts a specific animation using the name
        //returns true if that animation is available
        //in this actor's available animations
        public playAnimation(name : string) : boolean {
            for (let i = 0; i < this._animations.length; i++){
                if (name == this._animations[i].name) {
                    this._currentAnimation = this._animations[i];
                    this._currentAnimation.start();
                    this.updateBoundingRect();
                    return true;
                }
            }

            return false;
        }

        public update() {
            if (this._forces != undefined) {
                this._forces.update();
                this._location.add(this._forces.calculateFinalForce());
            }

            if (this._currentAnimation != undefined) {
                this._currentAnimation.update();
                this.updateBoundingRect();
            }
        }

        public draw(ctx : CanvasRenderingContext2D, cameraViewRect : Rectangle) {
            if (cameraViewRect.intersects(this._boundingRect)) {
                let screenCoords = Vector2.subtract(this._location, cameraViewRect.location);
                this._currentAnimation.draw(ctx, screenCoords);
            }
        }

        private updateBoundingRect() {
            this._boundingRect.location = this._location;
            if (this._currentAnimation != undefined) {
                this._currentAnimation.update();
                this._boundingRect.width = this._currentAnimation.width;
                this._boundingRect.height = this._currentAnimation.height;
            }
            else {
                this._boundingRect.width = 0;
                this._boundingRect.height = 0;
            }
        }
    }
}
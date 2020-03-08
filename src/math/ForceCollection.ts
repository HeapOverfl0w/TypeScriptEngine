namespace TSEngine {
    export class ForceCollection {

        private _forceArray : Force2[];

        public constructor(){
            this._forceArray = [];
        }

        public add(force : Force2){
            this._forceArray.push(force);
        }

        public remove(force : Force2){
            for (let i = this._forceArray.length - 1; i > -1; i--){
                if (this._forceArray[i] == force)
                    this._forceArray.splice(i, 1);
            }
        }

        public calculateFinalForce() : Vector2{
            let returnForce : Vector2 = new Vector2(0,0);
            for (let i = 0; i < this._forceArray.length; i++) {
                returnForce.add(this._forceArray[i]);
            }
            return returnForce;
        }

        public update() {
            for (let i = this._forceArray.length - 1; i > -1; i--){
                this._forceArray[i].update();
                if (this._forceArray[i].currentTime <= 0)
                    this._forceArray.splice(i, 1);
            }
        }
    }
}
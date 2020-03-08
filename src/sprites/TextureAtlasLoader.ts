namespace TSEngine {
    export class TextureAtlasLoader {
        private _animations : Animation[];

        public constructor () {
            this._animations = [];
        }

        public get animations() : Animation[] {
            return this._animations;
        }

        //loads from server texture atlas data and creates animations from it
        //location = directory on server
        //name = name of texture atlas and png without extension
        public async loadTextureAtlas(location : string, name : string) {
            let textureAtlasJsonData = await (await fetch(location + name + ".json")).json();
            let textureAtlasBlob = await (await fetch(location + name + ".png")).blob();
            let textureAtlasPng = new Image();
            textureAtlasPng.src = URL.createObjectURL(textureAtlasBlob);
            for (let o = 0; textureAtlasJsonData.keys; o++) {
                let animationName = textureAtlasJsonData.keys[o];
                this._animations.push(new Animation(animationName, textureAtlasPng, textureAtlasJsonData[animationName]));
            }
        }

        /*public loadTextureAtlasFromDom(jsonElementName : string, imageElementName : string) {
            let textureAtlasJsonData = document.getElementById(jsonElementName) as any;
            let textureAtlasPng = document.getElementById(imageElementName);
            for (let o = 0; textureAtlasJsonData.keys; o++) {
                this._animations.push(new Animation());
            }
        }*/
    }
}
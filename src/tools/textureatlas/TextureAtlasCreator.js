const fs = require('fs');
const Jimp = require('jimp')

var args = process.argv.slice(2);
var re = /(?:\.([^.]+))?$/;
const JSON_EXT = "json";
const PNG_EXT = "png";

(async function(){

if (args.length == 0) {
    console.log("No filepath specified");
    return;
}

//get file path from arguments
var filepath = args[0];

//gather files from the argument directory
var files = [];
files = fs.readdirSync(filepath);

//add in our directory slash if necessary
if (!filepath.endsWith("\\"))
    filepath += '\\';

//find all json and png files in the directory
//these should be exports from Aseprite
var jsonFiles = [];
var pngFiles = [];

for (let f = 0; f < files.length; f++){
    let extension = re.exec(files[f]);
    if (extension[1] == JSON_EXT) {
        jsonFiles.push(files[f]);
    }
    else if (extension[1] == PNG_EXT) {
        pngFiles.push(files[f]);
    }
}

//create our base textureAtlas data and image by
//getting all of the png files needed to create the
//texture atlas and determining the initial image size
var textureAtlas = {};

var width = 0;
var height = 0;
for (let i = 0; i < pngFiles.length; i++) {
    let pngImage = await Jimp.read(filepath + pngFiles[i]);
    if (pngImage.getWidth() > width)
        width = pngImage.getWidth();
    height += pngImage.getHeight();
}
var taImage = new Jimp(width, height, (err, taImage) => {
    if (err)
        console.log("Unable to create Jimp image");
});


//pull out all of the information from the sprite sheet jsons
//so that all of their frames are added into our new textureAtlas json
//we will also add the height as necessary so that the frames x and y match
//the image they're associated with on the imageAtlas
var currentHeightPosition = 0;

for (let j = 0; j < jsonFiles.length; j++){
    console.log("Adding " + jsonFiles[j] + " to texture atlas data");
    var pngFile = undefined;
    try {
        let fileContent = fs.readFileSync(filepath + jsonFiles[j]);
        var spriteSheet = JSON.parse(fileContent);
        pngFile = spriteSheet.meta.image;
        for (let f = 0; f < spriteSheet.frames.length; f++){
            spriteSheet.frames[f].frame.y += currentHeightPosition;
        }
        textureAtlas[pngFile.slice(0, -4)] = spriteSheet.frames;
    }
    catch (err) {
        console.log("Unable to load json");
    }
    
    for (let i = 0; i < pngFiles.length; i++) {
        if (pngFile == pngFiles[i]){
            console.log("Adding " + pngFile + " to texture atlas png");
            let pngImage = await Jimp.read(filepath + pngFiles[i]);
            taImage.composite(pngImage, 0, currentHeightPosition);
            currentHeightPosition += pngImage.getHeight();
            break;            
        }
    }
}

//write out our files
fs.writeFileSync(filepath + 'textureAtlas.json', JSON.stringify(textureAtlas));
console.log(filepath + "textureAtlas.json created!")

taImage.write(filepath + "textureAtlas.png");
console.log(filepath + "textureAtlas.png created!");
})();


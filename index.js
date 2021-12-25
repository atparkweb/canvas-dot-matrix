var canvas,
    context,
    tileWidth,
    tileHeight,
    imageData,
    pixels,
    numTileRows = 10,
    numTileCols = 10,
    dot_size = 1,
    playAnimation = true,
    framerate = 33;

var imageSrc = "./assets/blackmage.png",
    srcWidth = 220,
    srcHeight = 380;

$(document).ready(function() {
    canvas = $("#canvas")[0];
    context = canvas.getContext("2d");

    loadImage(true);
});

function loadImage(first_time) {
    var image = new Image();
    image.src = imageSrc;
    $(image).load(function() {
        context.drawImage(image, 0, 0, srcWidth, srcHeight);
        if(first_time) {
            init();
        }
    });
}

function init() {
    initImageData();
    bindControls();
}

function initImageData() {
    var $canvas = $(canvas);
    imageData = context.getImageData(0, 0, $canvas.width(), $canvas.height());
    tileWidth = imageData.width / numTileCols;
    tileHeight = imageData.height / numTileRows;
    pixels = imageData.data;
}
function bindControls() {
    $('#controls').on('click', 'button', function() {
        if ($(this).attr('id') == 'play') {
            setTimeout(render, 30);
            playAnimation = true;
        } else {
            dot_size = 1;
            loadImage(false);
        }
    });
}
function clearCanvas() {
    context.clearRect(0,0, $(canvas).width(), $(canvas).height());
}
function render() {
    clearCanvas();

    for(var r = 0; r < numTileRows; r++) {
        for(var c = 0; c < numTileCols; c++) {
            var x = (c * tileWidth) + (tileWidth / 2);
            var y = (r * tileHeight) + (tileHeight / 2);

            var pos = (Math.floor(y) * (imageData.width * 4)) + (Math.floor(x) * 4);

            var red = pixels[pos];
            var green = pixels[pos+1];
            var blue = pixels[pos+2];

            context.fillStyle = "rgb("+red+","+green+","+blue+")";
            context.beginPath();
            context.arc(x, y, dot_size, 0, Math.PI*2, false);
            context.closePath();
            context.fill();
        }
    }
    if(playAnimation && dot_size < tileWidth/2-2) {
        setTimeout(render,framerate);
    }
    dot_size = dot_size >= tileWidth ? 1 : dot_size + 1;
}

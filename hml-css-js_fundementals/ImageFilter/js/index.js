
var img=null, redimg=null, grayimg=null, trimg=null, can=null, ctx=null, i=0;
function showImage(){
  //fill canvas with the uploaded image
  can = document.getElementById("can");
  ctx= can.getContext("2d");
  var filu = document.getElementById("fu");
  img = new SimpleImage(filu);
  img.drawTo(can);
}

function  TriangleShape() {
  if(i!=3 && trimg!=null){
    trimg.drawTo(can);
    i=3;
  }else{
    var x, y, red, green, blue, avg;
    var width = img.getWidth();
    var height = img.getHeight();
    console.log(width, height);

    trimg = new SimpleImage(width, height);

    //upper part as red
    for(var i=0; i<width; i++){
      for(var j=0; j<height; j++){
        var trpixel = trimg.getPixel(i, j);
        var orgpixel = img.getPixel(i, j);
        trpixel.setRed(orgpixel.getRed());
      }
    }

    i=3;
    trimg.drawTo(can);

   /* for(var pixel of img.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var red = pixel.getRed();
      var green = pixel.getGreen();
      var blue = pixel.getBlue();
      var avg = (red+green+blue)/3;

      //red image
      var redpixel = trimg.getPixel(x, y);
    }*/

  }
}

function restImage(){
  if(i!=0 && img != null){
    img.drawTo(can);
    i=0;
  }
}

function changeToRed(){
  if(i!=1 && redimg!=null){
    redimg.drawTo(can);
    i=1;
  }else if(redimg==null && img!=null){
    redimg = new SimpleImage(img.getWidth(), img.getHeight());

    for(var pixel of img.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var red = pixel.getRed();
      var green = pixel.getGreen();
      var blue = pixel.getBlue();
      var avg = (red+green+blue)/3;

      //red image
      var redpixel = redimg.getPixel(x, y);

      if(avg < 128){
        redpixel.setRed(2*avg);
      }else{
        redpixel.setRed(255);
        redpixel.setGreen(2*avg - 255);
        redpixel.setBlue(2*avg - 255);
      }
      
    }
    i=1;
    redimg.drawTo(can);
  }
}

function changeToGray() {
 if(i!=2 && grayimg!=null){
  grayimg.drawTo(can);
  i=2;

 } else if(grayimg==null && img!=null){
    grayimg = new SimpleImage(img.getWidth(), img.getHeight());
  
    for(var pixel of img.values()){
      var x = pixel.getX();
      var y = pixel.getY();
      var red = pixel.getRed();
      var green = pixel.getGreen();
      var blue = pixel.getBlue();
      var avg = (red+green+blue)/3;

      //grayimage
      var graypixel = grayimg.getPixel(x, y);
      graypixel.setRed(avg);    
      graypixel.setGreen(avg);
      graypixel.setBlue(avg);
    }  
    i=2;
    grayimg.drawTo(can);
 }
}

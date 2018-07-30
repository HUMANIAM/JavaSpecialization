
var img=null, redimg=null, grayimg=null, can=null, ctx=null, i=0;
function showImage(){
  //fill canvas with the uploaded image
  can = document.getElementById("can");
  ctx= can.getContext("2d");
  var filu = document.getElementById("fu");
  img = new SimpleImage(filu);
  img.drawTo(can);
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

      //red image
      var redpixel = redimg.getPixel(x, y);
      redpixel.setRed(red);
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

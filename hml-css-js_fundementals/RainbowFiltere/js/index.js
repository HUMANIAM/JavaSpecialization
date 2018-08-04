
var img=null, redimg=null, grayimg=null, trimg=null, i=0,
    can=null, ctx=null, rainimg= null, blurimg = null ;

function showImage(){
  //fill canvas with the uploaded image
  img=null; redimg=null; grayimg=null; trimg=null;
  rainimg=null, blurimg=null;
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

function rainBow(){
  if(i!=4 && rainimg!=null){
    rainimg.drawTo(can);
    i=4;
  }else if(rainimg==null && img!=null){
    rainimg = new SimpleImage(img.getWidth(), img.getHeight());
    var x, y, r, g, b, avg, h, rainpxl;

    h7th = Math.floor(img.getHeight()/7);
    for(var pixel of img.values()){
        x = pixel.getX();
        y = pixel.getY();
        r = pixel.getRed();
        g = pixel.getGreen();
        b = pixel.getBlue();
        rainpxl = rainimg.getPixel(x, y);
        avg = Math.floor(r+g+b)/3
        
        //rainbow filter algorithm
        if(y < h7th){
           //red 
           if(avg < 128){
               rainpxl.setRed(2*avg);
               rainpxl.setGreen(0);
               rainpxl.setBlue(0);
           }else{
              rainpxl.setRed(255);
              rainpxl.setGreen(2*avg - 255);
              rainpxl.setBlue(2*avg - 255); 
           }
        }else if (y >= h7th && y < 2*h7th){
          //orange
          if(avg < 128){
              rainpxl.setRed(2*avg);
              rainpxl.setGreen(0.8*avg);
              rainpxl.setBlue(0);
          }else{
             rainpxl.setRed(255);
             rainpxl.setGreen(1.2*avg - 51);
             rainpxl.setBlue(2*avg - 255); 
          }  
        }else if(y >= 2*h7th && y<3*h7th){
          //yellow  
          if(avg < 128){
              rainpxl.setRed(2*avg);
              rainpxl.setGreen(2*avg);
              rainpxl.setBlue(0);
          }else{
             rainpxl.setRed(255);
             rainpxl.setGreen(255);
             rainpxl.setBlue(2*avg - 255); 
          }
        }else if (y >= 3*h7th && y < 4*h7th ){
          //green  
          if(avg < 128){
              rainpxl.setRed(0);
              rainpxl.setGreen(2*avg);
              rainpxl.setBlue(0);
          }else{
             rainpxl.setRed(2*avg - 255);
             rainpxl.setGreen(255);
             rainpxl.setBlue(2*avg - 255); 
          }
        }else if(y >= 4*h7th && y < 5*h7th){
           //blue 
           if(avg < 128){
               rainpxl.setRed(0);
               rainpxl.setGreen(0);
               rainpxl.setBlue(2*avg);
           }else{
              rainpxl.setRed(2*avg - 255);
              rainpxl.setGreen(2*avg - 255);
              rainpxl.setBlue(255); 
           }
        }else if(y >= 5*h7th && y < 6*h7th){
           //indigo 
           if(avg < 128){
               rainpxl.setRed(0.8*avg);
               rainpxl.setGreen(0);
               rainpxl.setBlue(2*avg);
           }else{
              rainpxl.setRed(1.2*avg - 51);
              rainpxl.setGreen(2*avg - 255);
              rainpxl.setBlue(255); 
           }
        }else{
            //violet 
            if(avg < 128){
                rainpxl.setRed(1.6*avg);
                rainpxl.setGreen(0);
                rainpxl.setBlue(1.6*avg);
            }else{
               rainpxl.setRed(0.4*avg - 153);
               rainpxl.setGreen(2*avg - 255);
               rainpxl.setBlue(0.4*avg + 153); 
            }
        }       
    }
    i=4;
    rainimg.drawTo(can);
}
}

function blurImage(){
  if(i!=5 && blurimg!=null){
   blurimg.drawTo(can);
   i=5;

  } else if(blurimg==null && img!=null){
     blurimg = new SimpleImage(img.getWidth(), img.getHeight());
     var x, y, blurpxl, rand;

     for(var pixel of img.values()){
        rand = Math.random();
        x = pixel.getX();
        y = pixel.getY();

        if(rand < 0.5){
          blurimg.setPixel(x, y, pixel);
        }else{
          var randx = Math.floor(Math.random()*30);
          var randy = Math.floor(Math.random()*30);
          var nx    = x-randx;
          var ny    = y-randy; 

          if(nx < 0 || ny < 0){
            blurimg.setPixel(x, y, pixel);
          }else{

            blurimg.setPixel(x, y, img.getPixel(nx, ny));
          }
        }
       }

     i=5;
     blurimg.drawTo(can);
  }
}


var fgimg=null, bgimg=null, outimg=null, can=null, ctx=null, ctx1=null, can1=null, ocan=null, i=0, j=0;

function showfg(){
  can = document.getElementById("can");
  ctx= can.getContext("2d");
  var filu = document.getElementById("fu");
  fgimg = new SimpleImage(filu);
  fgimg.drawTo(can);
  i=1;
}

function showbg(){
  can1 = document.getElementById("can1");
  ctx1= can1.getContext("2d");
  var filu = document.getElementById("fu1");
  bgimg = new SimpleImage(filu);
  bgimg.drawTo(can1);
  j=1;
}

function add2imgs(){
  outimg = new SimpleImage(fgimg.getWidth(), fgimg.getHeight());
  var x, y;
  for(var pxl of fgimg.values()){
    x = pxl.getX();
    y = pxl.getY();
    
     if(pxl.getGreen() > (pxl.getRed() + pxl.getBlue())){
        var bgpixel = bgimg.getPixel(x, y);
        outimg.setPixel(x, y, bgpixel);
    }else{
        outimg.setPixel(x, y, pxl);
        
    }  
  }
}

function addImages(){
  if(i==1 && j==1){
    //ctx1.clearRect(0, 0, can1.width, can1.height);
    add2imgs();
   ocan = document.getElementById("outimage");
    outimg.drawTo(ocan);
    i=0;  j=0;
  }else if(i==1 && j==0){
    alert("upload the background image first");
    return;
  }else if(i==0 && j==1){
    alert("upload the foreground image first");
    return;
  }else{
    alert("upload new images");
    return;
  }
  
}

function clearcanvas(){
  if(bgimg != null){
    ctx1.clearRect(0, 0, can1.width, can1.height);
    bgimag = null;
  }
  
  if(fgimg != null){
    ctx.clearRect(0, 0, can.width, can.height);
  }
  
  if(outimg != null){
    octx = ocan.getContext("2d");
    octx.clearRect(0, 0, ocan.width, ocan.height);
  }
}
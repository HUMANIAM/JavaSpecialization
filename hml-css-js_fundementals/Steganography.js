/*
name : Ibrahim Elsaid Saad
app : hide image inside anthor image (steganography)
date : 7/31/2018
time : 4:11 AM
course : Java specialization
*/

//#read images (wrapper and data)
var start = new SimpleImage("usain.jpg");       //read the wrapper image
var hide = new SimpleImage("smalllion.jpg");      //read the data image

//width of stegano image
var w = Math.min(start.getWidth(), hide.getWidth());

//height of stegano image
var h = Math.min(start.getHeight(), hide.getHeight());

//make the 2 images has the same dims
var nstart, nhide;
makeEqual();
start = nstart;
hide = nhide;

//######################################
//hide data image inside wrapper image

var hiddenData = hideData(start, hide);         
//print(hiddenData);

//######################################
//extract data and wrapper images from stegano image
var wrapper = new SimpleImage(w, h);            //wrapper image from stegano image
var data   = new SimpleImage(w, h);             //data image from stegano image

extractData(hiddenData);         
print(data);

function makeEqual(){
   nstart = crop(start, start.getWidth()-w, start.getHeight()-h);
   nhide = crop(hide, hide.getWidth()-w, hide.getHeight()-h);
}

function crop(img, minw, minh){
    var nimg = new SimpleImage(w, h);
    var iw = img.getWidth();
    var ih = img.getHeight();
    var lw = Math.floor(minw/2);
    var rw = minw - lw;
    var hh = Math.floor(minh/2);
    var lh = minh - hh;
    var i=0, j=0;
   // print(minw, lw, rw);
   for (var px of img.values()){
       var x = px.getX();
       var y = px.getY();
       if(x>=lw && x<=iw-1-rw && y>=hh && y<=ih-1-lh ){
            nimg.setPixel(x-lw, y-hh, img.getPixel(x, y));
        }
       
   }
    return nimg;
}


function hideData(wrapper, data){
    var res_image = new SimpleImage(w, h);
    var x, y, wr, wg, wb, dr, dg, db, or, og, ob, dpixel, opixel;
    for(var pixel of wrapper.values()){
        x = pixel.getX();
        y = pixel.getY();
        dpixel = data.getPixel(x, y);
        opixel = res_image.getPixel(x, y);
        
        wr = pixel.getRed();
        wg = pixel.getGreen();
        wb = pixel.getBlue();
        dr = dpixel.getRed();
        dg = dpixel.getGreen();
        db = dpixel.getBlue();

        //result data
        or = Math.floor(wr/16)*16 + Math.floor(dr/16);
        og = Math.floor(wg/16)*16 + Math.floor(dg/16);
        ob = Math.floor(wb/16)*16 + Math.floor(db/16);

        opixel.setRed(or);
        opixel.setGreen(og);
        opixel.setBlue(ob);
    }
    return res_image;
}


function extractData(container){
  var w, h, x, y, wr, wg, wb, dr, dg, db, cr, cg, cb, dpixel, wpixel;
  
  for(var pixel of container.values()){
    x = pixel.getX();
    y = pixel.getY();
    dpixel = data.getPixel(x, y);
    wpixel = wrapper.getPixel(x, y);
    cr = pixel.getRed();
    cg = pixel.getGreen();
    cb = pixel.getBlue();

    //wrapper
    wpixel.setRed(Math.floor(cr/16));
    wpixel.setGreen(Math.floor(cg/16));
    wpixel.setBlue(Math.floor(cb/16));

    //data
    dpixel.setRed((cr%16)*16);
    dpixel.setGreen((cg%16)*16);
    dpixel.setBlue((cb%16)*16);
  }
}
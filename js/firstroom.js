
var FirstRoom = FirstRoom || {};

FirstRoom.FadeDuration = 100;

FirstRoom.displayRoom = function(){

   // Paints the room map in a bitmap
   rm = game.cache.getImage('roomMap');
   w = rm.width;
   h = rm.height;
   bmd = game.make.bitmapData(w, h);
   FirstRoom.bmd = bmd;
   bmd.copy('roomMap');
   bmd.update();

   // The room appears
   roomImage = game.add.sprite(100, 100, 'room');
   FirstRoom.image = roomImage;
   roomImage.smoothed = false;
   roomImage.scale.set(1);
   roomImage.alpha=0;

   // The room gets animated
   anim = roomImage.animations.add('work');
   anim.play(10, true);

   FirstRoom.fadeIn = game.add.tween(roomImage);
   FirstRoom.fadeIn.to( { alpha: 1 }, FirstRoom.fadeDuration, "Linear", true);

   roomImage.inputEnabled = true;
   roomImage.events.onInputOver.add(FirstRoom.over, this);
   roomImage.events.onInputOut.add(FirstRoom.out, this);


   game.input.onDown.add(FirstRoom.down, this);
}

FirstRoom.over = function(){
   FirstRoom.isOver = true; //.log('over');
}


FirstRoom.out = function(){
   FirstRoom.isOver = false;
}


FirstRoom.windowover = function(){
   FirstRoom.isWindowOver = true;
}


FirstRoom.windowout = function(){
   FirstRoom.isWindowOver = false;
}

FirstRoom.windowdown = function(){
}


FirstRoom.checkMouse = function(){
   if (FirstRoom.isOver){
      x = game.input.x;
      y = game.input.y;
      color = FirstRoom.bmd.getPixel(x-100, y-100);
   }
}

FirstRoom.fadeOut = function(){
   s = game.add.tween(FirstRoom.image);
   s.to( { alpha: 0 }, 1000, "Linear", true);
   s.onComplete.add(CampFire.displayFire , this);
}

var msg = false;

FirstRoom.down = function(){
  console.log("toto")
  if (!(FirstRoom.window1 === undefined) && FirstRoom.window1.alpha != 0){
    if (!FirstRoom.isWindowOver){
      console.log('clicked and not on window');
      Title.clicksound.play();

      FirstRoom.windowfadeOut = game.add.tween(FirstRoom.window1);
      FirstRoom.windowfadeOut.to( { alpha: 0 }, FirstRoom.fadeDuration, "Linear", true);
    }
    else{
      console.log('clicked and on window');

    }
  }
  else if (FirstRoom.isOver){
  console.log("clicked on room");
  Title.clicksound.play();


      x = game.input.x;
      y = game.input.y;
      color = FirstRoom.bmd.getPixel32(x-100, y-100);

      if (color == 4294902015 && !msg){
         console.log('you clicked the computer');
         msg = true;
         FirstRoom.createTitle();

      }
      else if (color == 4294901778 && !msg){
        FirstRoom.bottle();
      }
      else if (color == 4278190335 && !msg){
        console.log('you clicked the mouchoirs');
      }
    }

}

FirstRoom.bottle = function(){
  // The room appears
  window1 = game.add.sprite(20, 20, 'window');
  FirstRoom.window1 = window1;
  window1.smoothed = false;
  window1.scale.set(0.5);
  window1.alpha=0;

  FirstRoom.windowfadeIn = game.add.tween(window1);
  FirstRoom.windowfadeIn.to( { alpha: 1 }, FirstRoom.fadeDuration, "Linear", true);

  window1.inputEnabled = true;
  window1.events.onInputOver.add(FirstRoom.windowover, this);
  window1.events.onInputOut.add(FirstRoom.windowout, this);
  //console.log("hey");

  //window1.events.onInputDown.add(FirstRoom.windowdown, this);
}

FirstRoom.createTitle = function(){
   computerMsg = game.add.bitmapText(100, 500, 'ubuntu', ' You clicked the computer...', 14);
   FirstRoom.computerMsg = computerMsg;
   typingsound = game.add.audio('typingsound');

   FirstRoom.title = typewriter.init(game, {
      x: 100,
      y: 500,
      writerObj: FirstRoom.computerMsg,
      time:50,
      maxWidth: 500,
      endFn: FirstRoom.msgFadeOut,
      sound: typingsound,
      text: "You clicked on the computer..."
   });
   typewriter.start();
}

FirstRoom.msgFadeOut = function(){

   s = game.add.tween(FirstRoom.computerMsg);
   s.to( { alpha: 0 }, 2000, "Linear", true);
   s.onComplete.add(function(){ msg=false; FirstRoom.fadeOut(); } , this);

}

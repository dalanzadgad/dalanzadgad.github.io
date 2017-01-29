
var FirstRoom = FirstRoom || {};

FirstRoom.FadeDuration = 1000;

FirstRoom.displayRoom = function(){

   rm = game.cache.getImage('roomMap');
   w = rm.width;
   h = rm.height;
   bmd = game.make.bitmapData(w, h);
   FirstRoom.bmd = bmd;
   bmd.copy('roomMap');
   bmd.update();

   roomImage = game.add.sprite(100, 100, 'room');
   FirstRoom.image = roomImage;
   roomImage.smoothed = false;
   roomImage.scale.set(1);
   roomImage.alpha=0;

   anim = roomImage.animations.add('work');
   anim.play(10, true);

   FirstRoom.fadeIn = game.add.tween(roomImage);
   FirstRoom.fadeIn.to( { alpha: 1 }, FirstRoom.fadeDuration, "Linear", true);

   roomImage.inputEnabled = true;
   roomImage.events.onInputOver.add(FirstRoom.over, this);
   roomImage.events.onInputOut.add(FirstRoom.out, this);
   roomImage.events.onInputDown.add(FirstRoom.down, this);


}

FirstRoom.over = function(){
   FirstRoom.isOver = true; //.log('over');
}


FirstRoom.out = function(){
   FirstRoom.isOver = false;
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
      x = game.input.x;
      y = game.input.y;
      color = FirstRoom.bmd.getPixel32(x-100, y-100);
      if (color == 4294902015 && !msg){
         console.log('you clicked the computer');
         msg = true;
         FirstRoom.createTitle();

      }
}

FirstRoom.createTitle = function(){

   computerMsg = game.add.bitmapText(10, 500, 'ubuntu', ' You clicked the computer...', 14);
   FirstRoom.computerMsg = computerMsg;
   computerMsg.alpha = 0.1;

   s = game.add.tween(computerMsg);
   s.to( { alpha: 1 }, 1000, "Linear", true);
   s.onComplete.add(FirstRoom.msgFadeOut, this);
}

FirstRoom.msgFadeOut = function(){

   s = game.add.tween(FirstRoom.computerMsg);
   s.to( { alpha: 0 }, 1000, "Linear", true);
   s.onComplete.add(function(){ msg=false; FirstRoom.fadeOut(); } , this);

}

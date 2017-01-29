
var FirstRoom = FirstRoom || {};

FirstRoom.displayRoom = function(){

   rm = game.cache.getImage('roomMap');
   w = rm.width;
   h = rm.height;
   FirstRoom.bmd = game.make.bitmapData(w, h);
   FirstRoom.bmd.copy('roomMap');
   FirstRoom.bmd.update();

   FirstRoom.image = game.add.sprite(100, 100, 'pic');
   FirstRoom.image.smoothed = false;
   FirstRoom.image.scale.set(1);
   FirstRoom.image.alpha=0;

   anim = FirstRoom.image.animations.add('work');
   anim.play(10, true);

   FirstRoom.fadeIn = game.add.tween(FirstRoom.image);
   FirstRoom.fadeIn.to( { alpha: 1 }, 4000, "Linear", true);

   FirstRoom.image.inputEnabled = true;
   FirstRoom.image.events.onInputOver.add(FirstRoom.over, this);
   FirstRoom.image.events.onInputOut.add(FirstRoom.out, this);
   FirstRoom.image.events.onInputDown.add(FirstRoom.down, this);


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

   FirstRoom.title = game.add.bitmapText(10, 500, 'ubuntu', ' You clicked the computer...', 14);
   FirstRoom.title.alpha = 0.1;

   FirstRoom.titlefadeIn = game.add.tween(FirstRoom.title);
   FirstRoom.titlefadeIn.to( { alpha: 1 }, 1000, "Linear", true);
   FirstRoom.titlefadeIn.onComplete.add(FirstRoom.titlefadeOut, this);
}

FirstRoom.titlefadeOut = function(){

   FirstRoom.fadeOut = game.add.tween(FirstRoom.title);
   FirstRoom.fadeOut.to( { alpha: 0 }, 1000, "Linear", true);
   FirstRoom.fadeOut.onComplete.add(function(){msg=false;} , this);

}

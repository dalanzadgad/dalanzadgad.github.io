
var FirstRoom = FirstRoom || {};

FirstRoom.displayRoom = function(){

   FirstRoom.image = game.add.sprite(100, 100, 'pic');
   FirstRoom.image.smoothed = false;
   FirstRoom.image.scale.set(1);
   FirstRoom.image.alpha=0;

   anim = FirstRoom.image.animations.add('work');
   anim.play(10, true);

   FirstRoom.fadeIn = game.add.tween(FirstRoom.image);
   FirstRoom.fadeIn.to( { alpha: 1 }, 4000, "Linear", true);

}



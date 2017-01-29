
var CampFire = CampFire || {};

CampFire.displayFire = function(){

   CampFire.image = game.add.sprite(100, 100, 'campFire');
   CampFire.image.smoothed = false;
   CampFire.image.scale.set(1);
   CampFire.image.alpha=0;

   anim = CampFire.image.animations.add('work');
   anim.play(10, true);

   CampFire.fadeIn = game.add.tween(CampFire.image);
   CampFire.fadeIn.to( { alpha: 1 }, 4000, "Linear", true);

   CampFire.image.inputEnabled = true;

   s = game.add.tween(CampFire.image);
   s.to({x:-100}, 20000, "Linear", true);

   music = game.add.audio('fnaf');
   music.onDecoded.add(start, this);
}

function start(){
      music.fadeIn(4000);
}


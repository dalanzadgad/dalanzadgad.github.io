
var CampFire = CampFire || {};

CampFire.fadeDuration = 1000;

CampFire.displayFire = function(){

   campImage = game.add.sprite(100, 100, 'campFire');
   campImage.smoothed = false;
   campImage.scale.set(1);
   campImage.alpha=0;

   anim = campImage.animations.add('work');
   anim.play(10, true);

   s1 = game.add.tween(campImage);
   s1.to( { alpha: 1 }, CampFire.fadeDuration, "Linear", true);

   campImage.inputEnabled = true;

   s2 = game.add.tween(campImage);
   s2.to({x:-100}, 20000, "Linear", true);

   music = game.add.audio('fnaf');
   music.onDecoded.add(start, this);
}

function start(){
      music.fadeIn(4000);
}


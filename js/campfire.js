
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

   s2 = game.add.tween(campImage);
   s2.to({x:-100}, 15000, "Linear", true);

   s3 = game.add.tween(campImage);
   s3.to({y:100}, 9000, "Linear", true);
   s3.onComplete.add(CampFire.fadeOut, this);

   music = game.add.audio('fnaf');
   music.onDecoded.add(start, this);
}

function start(){
      music.fadeIn(4000);
}

CampFire.fadeOut = function(){
   s1 = game.add.tween(campImage);
   s1.to({alpha:0}, 1000, "Linear", true);
   s1.onComplete.add(Skyline.displaySkyline, this);

}


var Skyline = Skyline || {};

Skyline.displaySkyline = function(){

   skylineImage = game.add.sprite(100, 100, 'skyline');
   skylineImage.smoothed = false;
   skylineImage.scale.set(1);
   skylineImage.alpha=0;

   anim = skylineImage.animations.add('work');
   anim.play(10, true);

   s1 = game.add.tween(skylineImage);
   s1.to( { alpha: 1 }, 1000, "Linear", true);

   s2 = game.add.tween(skylineImage);
   s2.to({y:-150}, 15000, "Linear", true);

   s3 = game.add.tween(skylineImage);
   s3.to({x:100}, 9000, "Linear", true);
   s3.onComplete.add(Skyline.fadeOut, this);

}

Skyline.fadeOut = function(){
   s1 = game.add.tween(skylineImage);
   s1.to({alpha:0}, 1000, "Linear", true);
   s1.onComplete.add(Snowy.displaySnowy, this);

}


var Snowy = Snowy || {};

Snowy.displaySnowy = function(){

   snowyImage = game.add.sprite(-100, 50, 'snowy');
   snowyImage.smoothed = false;
   snowyImage.scale.set(1.5);
   snowyImage.alpha=0;

   anim = snowyImage.animations.add('work');
   anim.play(10, true);

   s1 = game.add.tween(snowyImage);
   s1.to( { alpha: 1 }, 1000, "Linear", true);

   s2 = game.add.tween(snowyImage);
   s2.to({x:100}, 15000, "Linear", true);

}

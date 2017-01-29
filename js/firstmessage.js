
var Title = Title || {};

Title.fadeDuration = 4000;

Title.createTitle = function(){

   title = game.add.bitmapText(100, 100, 'ubuntu', 'Dans trois minutes au plus tard, \n'+
                                                   '  je devrai avoir quitte cet endroit \n'+
                                                      'une fois pour toutes...', 14);
   Title.title = title;
   title.alpha = 0.1;

   s = game.add.tween(Title.title);
   s.to( { alpha: 1 }, Title.fadeDuration, "Linear", true);
   s.onComplete.add(Title.fadeOut, this);
}

Title.fadeOut = function(){

   s = game.add.tween(Title.title);
   s.to( { alpha: 0 }, Title.fadeDuration, "Linear", true);
   s.onComplete.add(FirstRoom.displayRoom, this);

}

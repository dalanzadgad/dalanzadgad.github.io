
var Title = Title || {};

Title.createTitle = function(){

   Title.title = game.add.bitmapText(100, 100, 'ubuntu', 'Dans trois minutes au plus tard, \n'+
                                                   '  je devrai avoir quitte cet endroit \n'+
                                                      'une fois pour toutes...', 14);
   Title.title.alpha = 0.1;

   Title.fadeIn = game.add.tween(Title.title);
   Title.fadeIn.to( { alpha: 1 }, 4000, "Linear", true);
   Title.fadeIn.onComplete.add(Title.fadeOut, this);
}

Title.fadeOut = function(){

   Title.fadeOut = game.add.tween(Title.title);
   Title.fadeOut.to( { alpha: 0 }, 4000, "Linear", true);
   Title.fadeOut.onComplete.add(FirstRoom.displayRoom, this);

}

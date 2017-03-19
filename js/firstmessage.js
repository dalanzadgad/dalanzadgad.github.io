
var Title = Title || {};

Title.fadeDuration = 100;


// The "title" sequence
Title.createTitle = function(){

   // First the text
   title = game.add.bitmapText(100, 100, 'ubuntu', 'Dans trois minutes au plus tard, \n'+
                                                   '  je devrai avoir quitte cet endroit \n'+
                                                      'une fois pour toutes...', 14);
   Title.title = title;
   title.alpha = 0.1;

   // The text fades in
   s = game.add.tween(Title.title);
   s.to( { alpha: 1 }, Title.fadeDuration, "Linear", true);

   // When it has appeared, let it fade out
   s.onComplete.add(Title.fadeOut, this);
}


// There it is.. Fade out
Title.fadeOut = function(){
   s = game.add.tween(Title.title);
   s.to( { alpha: 0 }, Title.fadeDuration, "Linear", true);

   // When it has faded out, let the first room appear
   s.onComplete.add(FirstRoom.displayRoom, this);
}

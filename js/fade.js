function fadeIn(src, duration, onComplete){
  // The text fades in
  onComplete = onComplete || undefined;
  duration = duration || 1000;
  s = game.add.tween(src);
  s.to( { alpha: 1 }, duration, "Linear", true);

  // When it has appeared, let it fade out
  if (!(onComplete === undefined)){
    s.onComplete.add(onComplete, this);
  }
}

function fadeOut(src, duration, onComplete){
  // The text fades in
  onComplete = onComplete || undefined;
  duration = duration || 1000;
  s = game.add.tween(src);
  s.to( { alpha: 0 }, duration, "Linear", true);

  // When it has appeared, let it fade out
  if (!(onComplete === undefined)){
    s.onComplete.add(onComplete, this);
    console.log('oncomplete ' + src + ' ' + duration)
  }
}

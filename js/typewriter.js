var dialogs = [];
var dialogsSprites = [];


function Typewriter() {
    this.typedText;
    this.timer;
    this.pickedQuote;
    var _that = this;
    var game;

    function init(gameInstance, options) {
        game = gameInstance;
        _that.time = options.time || Phaser.Timer.SECOND / 10;
        _that.sound = options.sound || null;
        _that.soundMarker = options.soundMarker || null;
        _that.writerFn = options.writerFn || null;
        _that.endFn = options.endFn || null;
        _that.times = options.times || 10;
        _that.text = options.text || "";
        _that.x = options.x || 100;
        _that.y = options.y || 100;
        _that.maxWidth = options.maxWidth || 200;
        _that.fontFamily = options.fontFamily || "blackFont";
        _that.fontSize = options.fontSize || 28;
        _that.writerObj = options.writerObj || null;
    }

    function start() {
        enableTypingSpecificMessage(_that.text, _that.x, _that.y);
    }

    function stop() {
        if (_that.timer !== undefined) {
            _that.timer.stop();
            game.time.events.remove(_that.timer);
        }
        if (_that.sound !== null) {
            _that.sound.stop();
        }
        //if(_that.typedText !== undefined){ // This can cause problems if you repeatedly type to a text object. ~Tilde
        //    _that.typedText.destroy();
        //}
    }

    function enableTypingSpecificMessage(text, x, y) {

        if (_that.writerObj === null) {
            _that.typedText = game.add.bitmapText(x, y, _that.fontFamily, text, _that.fontSize);
        } else {
            _that.typedText = _that.writerObj;
            x = _that.writerObj.x;
            y = _that.writerObj.y;
        }
        _that.typedText.maxWidth = _that.maxWidth;
        _that.currentLetter = 0;
        var length = _that.typedText.children.length;

        for (var i = 0; i < length; i++) {
            var letter = _that.typedText.getChildAt(i);
            letter.alpha = 0;
        }


        _that.typedText.x = x;
        _that.typedText.y = y;
        if (_that.endFn !== null) {
            countdown(typeWriter, length, _that.endFn);
        } else {
            countdown(typeWriter, length);
        }
    }

    /**
     * [countDown description]
     * @param  {Function} fn    [description]
     * @param  {[type]}   endFn [description]
     * @return {[type]}         [description]
     */
    function countdown(fn, times, endFn) {
        var _timer = game.time.create(false);
        _timer.start();
        endFn = endFn || function() {
            game.time.events.remove(_timer);
            if (_that.sound !== null) {
                _that.sound.stop();
            }
        };
        _timer.onComplete.add(endFn);
        _timer.repeat(_that.time, times, fn, this);
        _that.timer = _timer;
    }

    function typeWriter(text) {
        var letter = _that.typedText.getChildAt(_that.currentLetter);
        if (_that.sound !== null && letter != ' ') {
            if (_that.sound.isPlaying === false) {
                _that.sound.play();
            }
        }
        letter.alpha = 1;
        _that.currentLetter++;
    }

    return {
        init: function(gameInstance, options) {
            init(gameInstance, options);
        },
        start: function() {
            stop();
            start();
        },
        destroy: function() {
            _that.typedText.destroy();
        },
        hideText: function() {
            _that.typedText.visible = false;
        },
        showText: function() {
            _that.typedText.visible = true;
        },
        moveToTop: function() {
            game.bringToTop(_that.typedText);
        }
    }
}

function typeThis(x, y, text){
  size = Math.min(Math.floor(game.width/40), 14);
  console.log('size', size)
  var msg = game.add.bitmapText(x, y, 'ubuntu',
   text, size);
  dialogsSprites.push(msg);
  title = typewriter.init(game, {
     writerObj: msg,
     time:50,
     maxWidth: game.width,
     //endFn: function(){fadeOut(computerMsg, 1000)},
     sound: typingsound


  });
  typewriter.start();
}

function addDialog(dlg){
  if (dialogs.length<3){
    //dialogs.push(dlg);
    //typeThis(100, 500 + 14 * dialogs.length, dlg)
  }
  else{
    dialogs.splice(0, 1);
  }
  displayDialogs();
  dialogs.push(dlg);
  console.log(game.height)
  typeThis(10, game.height -14*4 + 14 * (dialogs.length-1), dlg)

}

function displayDialogs(dlg){
  for (var i=0; i< dialogsSprites.length ; i++){
    dialogsSprites[i].destroy();
  }
  for (var i=0; i< dialogs.length ; i++){
     size = Math.min(Math.floor(game.width/40), 14)
     console.log('size', size)
     var s = game.add.bitmapText(10, game.height -14*4 + 14*i,
        'ubuntu', dialogs[i], size);
     dialogsSprites.push(s);
  }
}

function addDialogs(dlg){
  for (var i =0;i<dlg;i++){
    addDialog(dlg[i]);
  }
}



function isIn(arr, obj) {
    return (arr.indexOf(obj) != -1);
}

var colormap = {'magenta':[255,0,255],
                'blue1':[18,0,255],
                'blue':[0,0,255],
                'red':[255,0,0],
                'yellow':[255,255,0],
                'green':[0,255,0]
                }

function findColor(color){
  console.log('find')
   for (var i=0;i<Object.keys(colormap).length;i++){
     var k = Object.keys(colormap)[i];
     console.log(k, colormap[k]);
     if (JSON.stringify(colormap[k]) == JSON.stringify([color.r, color.g, color.b])){
        return k
     }
   }
}

function getColor(o){
  input_x = game.input.x;
  input_y = game.input.y;
  scaleX = o.map.width/o.sprite.width;
  scaleY = o.map.height/o.sprite.height;
  x = (input_x - o.x*game.width)*scaleX;
  y = (input_y - o.y*game.height)*scaleY;
  color = o.bitmapData.getPixelRGB(Math.floor(x), Math.floor(y));
  return color;
}

function onEventMap(){
  typingsound.play();
  console.log(this.object)
  color = getColor(this.object, game.input.x, game.input.y)
  console.log(color)
  colorcode = findColor(color);
  if (!(colorcode === undefined)){
    mapActions = this.object.actions[colorcode];
    console.log(mapActions)
    if (typeof mapActions === 'function'){
      mapActions(this.scene);
    }
    else{
      if (this.type == 'down'){
        mapActions[this.type](this.scene);
      }
    }
  }
}
function p(pointer){
}

function Scene1(){
    this.init = function(gameInstance, options){
       this.game = gameInstance;
       this.game.scenes[options.name] = this;
       this.name = options.name;
       this.objects = {};
       this.rules = [];

       if (!(options.objects === undefined)){
         for (i=0;i<options.objects.length;i++){
            var o = options.objects[i];
            this.objects[o.name] = o;
         }
       }
       for (i=0;i<options.rules.length;i++){
          var r = options.rules[i];
          this.rules.push(r);
      }
    }

    this.update = function(){
       for (var i=0;i<this.rules.length;i++){
           var c = this.rules[i].conditions;
           var res = c(this);
           if (res){
             var a = this.rules[i].actions;
             a(this);
           }
       }
       for (var i=0;i<Object.keys(this.objects).length;i++){
          k = Object.keys(this.objects)[i];
          o = this.objects[k];
          if (o.image !== undefined){
            if (o.sprite.input.pointerOver()){
              color = getColor(o);
              console.log(color)
            }
          }
       }
    }

    this.addObject = function(o){

      if (!(o.text === undefined) && (o.sprite === undefined)){
         size = Math.floor(game.width/40);
         console.log('size', size)
         x = o.x*game.width;
         y = o.y*game.height;
         o.sprite = this.game.add.bitmapText(x, y, 'ubuntu', o.text, size);
         o.sprite.alpha = 0;
      }
      else if (!(o.image === undefined) && (o.sprite === undefined)){
        console.log(game.width)

        x = o.x*game.width;
        y = o.y*game.height;
        console.log(game.width)

        o.sprite = this.game.add.sprite(x, y, o.image);
        o.sprite.alpha = 0;
        o.sprite.smoothed = false;
        //o.sprite.scale.set(1);
        console.log(o)
        if (!(o.w === undefined)){
          var scale = o.sprite.width / o.sprite.height;
          console.log(scale)
          o.sprite.width = o.w * game.width;
          o.sprite.height = Math.floor(o.sprite.width / scale);
          console.log(o.sprite.height)
        }
        if (!(o.h === undefined)){
          o.sprite.height = h * game.height;
        }
        o.sprite.inputEnabled = true;
        if (!(o.onOver === undefined)){
          o.sprite.events.onInputOver.add(o.onOver, this);
        }
        if (!(o.onExit === undefined)){
          o.sprite.events.onInputOut.add(o.onExit, this);
        }
      }
      if (!(o.map === undefined) && (o.bitmapData === undefined)) {
        // Paints the room map in a bitmap
        w = o.map.width;
        h = o.map.height;
        console.log(w)
        o.bitmapData = this.game.make.bitmapData(w, h);
        o.bitmapData.copy(o.actions.name);
        //o.bitmapData.resize(o.sprite.width, o.sprite.height)
        o.bitmapData.update();

        console.log(o.bitmapData.width, o.bitmapData.height)
        o.sprite.events.onInputDown.add(onEventMap,
          {object:o, scene:this, type:'down'});

        //o.sprite.events.onInputOver.add(onEventMap,
        //    {object:o, scene:this, type:'hover'});

      }
    }

    this.activate = function(){
      this.game.active.push(this.name);
      console.log('activate ' +this.name + ' ' + this.game.active)

      // create bitmaps
      for (var i=0;i<Object.keys(this.objects).length;i++){

         var k = Object.keys(this.objects)[i]
         var o = this.objects[k];
         console.log(o)
         this.addObject(o)
      }

    }
    this.deactivate = function(){
      var index = this.game.active.indexOf(this.name);
      if (index > -1) {
          this.game.active.splice(index, 1);
      }
      for (var i = 0;i<this.objects;i++){
          this.objects[i].destroySprite();
      }
    }
  }

function preload(){
  game.scenes = {};
  game.active = [];
  game.load.audio('typingsound', ['audio/typingsound.mp3']);
  game.load.bitmapFont('ubuntu', 'rolling-thunder.png', 'rolling-thunder.xml');
  game.load.audio('fnaf', ['audio/fnaf.mp3']);

  var images = Preload();
  for (var i=0;i<images.length;i++){
    game.load.image(images[i], 'images/'+images[i]+'.png')
    game.load.image(images[i]+'Map', 'images/'+images[i]+'Map.png')
  }
}

function create(){
  typingsound = game.add.audio('typingsound');
  game.input.addMoveCallback(p, this);

  Create();
}

function Object1(){
   this.init = function(options){
      this.text = options.text;
      this.image = options.image;
      this.name = options.name;
      this.music = options.music
      this.x = options.x
      this.y = options.y
      this.w = options.w

      if (!(options.map === undefined)){
        this.map = game.cache.getImage(options.map.name);
        this.actions = options.map;

      }
      //this.onDown = options.onDown ||
   }
   this.destroySprite = function(){
     this.sprite.destroy();
     this.sprite = undefined;
     this.map = undefined;
     this.bitmapData = undefined;
   }

   this.animate = function(interval, loop){
      var interval = interval || 10;
      var loop = loop || true;
      this.animation = this.sprite.animations.add('animation');
      this.animation.play(interval, loop);
   }
}



function Rule1(){

  this.init = function(options){
     this.conditions = options.conditions || function(){return true;};
     this.actions = options.actions || function(){};
  }
}

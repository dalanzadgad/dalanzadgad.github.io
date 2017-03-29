

function isIn(arr, obj) {
    return (arr.indexOf(obj) != -1);
}

function onDownMap(){
  typingsound.play();
  x = game.input.x;
  y = game.input.y;
  color = this.object.bitmapData.getPixel32(x-100, y-100);
  if (isIn(Object.keys(this.object.actions), color.toString())){
    this.object.actions[color](this.scene);
  }
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
    }

    this.addObject = function(o){
      if (!(o.text === undefined) && (o.sprite === undefined)){
         o.sprite = this.game.add.bitmapText(100, 200, 'ubuntu', o.text, 14);
         o.sprite.alpha = 0;
      }
      else if (!(o.image === undefined) && (o.sprite === undefined)){
        o.sprite = this.game.add.sprite(100, 100, o.image);
        o.sprite.alpha = 0;
        o.sprite.smoothed = false;
        o.sprite.scale.set(1);
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
        o.bitmapData = this.game.make.bitmapData(w, h);
        o.bitmapData.copy(o.actions.name);
        o.bitmapData.update();
        o.sprite.events.onInputDown.add(onDownMap, {object:o, scene:this});
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
    }
  }



function Object1(){
   this.init = function(options){
      this.text = options.text;
      this.image = options.image;
      this.name = options.name;
      this.music = options.music

      if (!(options.map === undefined)){
        this.map = game.cache.getImage(options.map.name);
        this.actions = options.map;

      }
      //this.onDown = options.onDown ||
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

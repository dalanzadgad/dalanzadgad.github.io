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
  }
}


function Scene1(){
    this.init = function(gameInstance, options){
       this.game = gameInstance;
       this.game.scenes.push(this);
       console.log(this.game.scenes)
       //TODO: take background, music and map out to objects
       this.background = options.background || null;
       this.music = options.music || null;
       this.map = options.map || null;
       this.objects = {};
       this.rules = [];
       if (!(options.objects === undefined)){
         for (i=0;i<options.objects.length;i++){
            var o = options.objects[i];
            console.log(game)
            this.objects[o.name] = o;
            console.log('name' + o.name + o);
         }
       }
       console.log('rules length', options.rules.length);
       for (i=0;i<options.rules.length;i++){
          var r = options.rules[i];
          this.rules.push(r);
          console.log('rule', r)
      }
    }

    this.update = function(){
       for (var i=0;i<this.rules.length;i++){
           var c = this.rules[i].conditions;
           var res = c(this);
           console.log(c+res)
           if (res){
             var a = this.rules[i].actions;
             a(this);
           }
       }
    }

}

function Object1(){


   this.init = function(options){
      this.text = options.text || null;
      this.image = options.image || null;
      this.name = options.name;
   }

}

function Rule1(){

  this.init = function(options){
     this.conditions = options.conditions || function(){return true;};
     this.actions = options.actions || function(){};
  }
}

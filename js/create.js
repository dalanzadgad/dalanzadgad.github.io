// Firing the first event sequence (the title)
function create() {
   clicksound = game.add.audio('typingsound');


   var obj = new Object1()

   obj.init({name : 'object_name',
             text : 'Dans trois minutes au plus tard, \n'+
                     '  je devrai avoir quitte cet endroit \n'+
                     'une fois pour toutes...'}
           );

   var r = new Rule1();

   r.init({conditions: function(scene){
             return !(scene.objects['object_name'].isVisible);},

           actions: function(scene){
               var o = scene.objects['object_name'];
               o.isVisible=true;

               o.bitmapText = this.game.add.bitmapText(100, 200, 'ubuntu', o.text, 14);
               o.bitmapText.alpha=0.1;
               console.log('display object')
               fadeIn(o.bitmapText, 1000, function(){
                   fadeOut(o.bitmapText, 1000)});
           }
     });

   var scene1 = new Scene1();
   scene1.init(game, {objects: [obj],
                     rules: [r]});


   var r2 = new Rule1();

   r2.init({conditions: function(scene){
             var o1 = scene.game.scenes[0].objects['object_name'];
             var s = scene.game.scenes[1];
             console.log(s.isVisible)
             return (!(s.isVisible) && (o1.bitmapText.alpha==0));},

           actions: function(scene){
               scene.isVisible = true;
               // The room appears
               o = this.game.add.sprite(100, 100, 'room');
               scene.game.scenes[1].backgroundSprite = o;

               o.smoothed = false;
               o.scale.set(1);
               o.alpha = 0;

               // The room gets animated
               anim = o.animations.add('work');
               anim.play(10, true);
               console.log('anim')

               fadeIn(o, 1000)
               //console.log("display room");
           }
     });




   var scene2 = new Scene1();
   scene2.init(game, {background: 'room',
                      rules: [r2]});
   //game.scenes.push(scene1)
}

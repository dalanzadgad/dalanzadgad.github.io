// Firing the first event sequence (the title)
function create() {
   clicksound = game.add.audio('typingsound');

   var r = new Rule1();

   r.init({conditions: function(scene){
             return !(scene.objects['first_text'].isVisible);},

           actions: function(scene){
               var o = scene.objects['first_text'];

               o.isVisible = true;
               fadeIn(o.sprite, 1000, function(){
                   fadeOut(o.sprite, 1000,
                      function(){scene.game.scenes['room'].activate()}
                    )});
           }
     });

   var scene1 = new Scene1();
   var text = new Object1()

   text.init({name : 'first_text',
             text : 'Dans trois minutes au plus tard, \n'+
                     '  je devrai avoir quitte cet endroit \n'+
                     'une fois pour toutes...'});
   scene1.init(game, {name:'title',
                      objects: [text],
                     rules: [r]});




   var r2 = new Rule1();
   r2.init({conditions: function(scene){
             var o1 = scene.game.scenes['title'].objects['first_text'];
             var o2 = scene.objects['room'];
             return (o2.sprite.alpha ==0 && o1.sprite.alpha==0); },

           actions: function(scene){
               // The room appears
               var o = scene.objects['room'];
               o.animate();
               fadeIn(o.sprite, 1000)
               //console.log("display room");
           }
     });

   var scene2 = new Scene1();
   var room = new Object1();

   map = {name: 'roomMap',
        4294902015: function(){console.log('you clicked the computer');},
        4294901778: function(){console.log('you clicked the bottle');},
        4278190335: function(){console.log('you clicked the mouchoirs')} }


   room.init({name: 'room',
             image: 'room',
             map: map,
             })
   scene2.init(game, {name: 'room',
                      objects: [room],
                      rules: [r2]});
   scene1.activate();


   var scene3 = new Scene1();
   var campfire = new Object1();
   campfire.init({name: 'campfire'})
}

function preload() {
  game.scenes = {};
  game.active = [];
  game.scale.setGameSize(game.width, game.height)
  game.load.audio('typingsound', ['audio/typingsound.mp3']);
  game.load.bitmapFont('ubuntu', 'rolling-thunder.png', 'rolling-thunder.xml');

  game.load.image('toll', 'images/toll.jpg')
  game.load.image('tollMap', 'images/tollMap.png')

  game.load.audio('fnaf', ['audio/fnaf.mp3']);


}

// Firing the first event sequence (the title)
function create() {

   typingsound = game.add.audio('typingsound');

   //===================================================================
   var r = new Rule1();
   r.init({conditions: function(scene){
             return !(scene.objects['first_text'].isVisible);},

           actions: function(scene){
               var o = scene.objects['first_text'];
               o.isVisible = true;
               fadeIn(o.sprite, 1000, function(){
                   fadeOut(o.sprite, 1000,
                      function(){
                        scene.game.scenes['title'].deactivate();
                        scene.game.scenes['toll'].activate()}
                    )});
           }
     });

   var scene1 = new Scene1();
   var text = new Object1()

   text.init({name : 'first_text',
             text : 'As I walked in the mountain, \n'+
                     '  I finally found that secret place \n'+
                     'known by very few...',
              x:0.1,
              y:0.1});
   scene1.init(game, {name:'title',
                      objects: [text],
                     rules: [r]});


   //===================================================================

   var r2 = new Rule1();
   r2.init({conditions: function(scene){
             var o1 = scene.game.scenes['title'].objects['first_text'];
             var o2 = scene.objects['toll'];
             return (o2.sprite.alpha ==0 && o1.sprite.alpha==0); },

           actions: function(scene){
               // The room appears
               var o = scene.objects['toll'];
               o.animate();
               fadeIn(o.sprite, 1000)
               //console.log("display room");
           }
     });

   var scene2 = new Scene1();
   var toll = new Object1();


   map = {name: 'tollMap',
        'blue': function(scene){
          addDialog('Ladies enjoying the moment...')
        },
        'red': function(scene){
          addDialog('Nice waterfall...')

          console.log(scene.game.scenes);
          scene.game.scenes['room'].deactivate();
          scene.game.scenes['title'].objects['first_text'].isVisible = false;
          scene.game.scenes['title'].objects['first_text'].sprite.alpha = 0;
          fadeOut(scene.game.scenes['room'].objects['room'].sprite, 3000,
            function(){scene.game.scenes['title'].activate()});
        },
        'green': function(){addDialog('Pristine pond')},
        'yellow': function(){addDialog('Young men hanging out...')}
       }


   toll.init({name: 'toll',
             image: 'toll',
             map: map,
             x:0,
             y:0,
             w:1
             })
   scene2.init(game, {name: 'toll',
                      objects: [toll],
                      rules: [r2]});
   scene1.activate();

}

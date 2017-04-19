function preload() {
  game.scenes = {};
  game.active = [];
  game.scale.setGameSize(game.width, game.height)
  game.load.audio('typingsound', ['audio/typingsound.mp3']);
  game.load.bitmapFont('ubuntu', 'rolling-thunder.png', 'rolling-thunder.xml');

  game.load.image('toll', 'images/toll.png')
  game.load.image('tollMap', 'images/tollMap.png')
7
  game.load.image('passerelle', 'images/passerelle.png')
  game.load.image('passerelleMap', 'images/passerelleMap.png')

  game.load.image('guitare', 'images/guitare.png')
  game.load.image('guitareMap', 'images/guitareMap.png')

  game.load.image('night', 'images/night.png')
  game.load.image('nightMap', 'images/nightMap.png')
  game.load.image('cam', 'images/cam.png')
  game.load.image('camMap', 'images/camMap.png')



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
          scene.game.scenes['toll'].deactivate();
          scene.game.scenes['title'].objects['first_text'].isVisible = false;
          scene.game.scenes['title'].objects['first_text'].sprite.alpha = 0;
          fadeOut(scene.game.scenes['toll'].objects['toll'].sprite, 3000,
            function(){scene.game.scenes['passerelle'].activate()});
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

   //===================================================================
   var r3 = new Rule1();
   r3.init({conditions: function(scene){
             var o1 = scene.game.scenes['toll'].objects['toll'];
             var o2 = scene.objects['passerelle'];
             return (o2.sprite.alpha ==0 && o1.sprite.alpha==0); },

           actions: function(scene){
               // The room appears
               var o = scene.objects['passerelle'];
               fadeIn(o.sprite, 1000)
           }
     });
     map = {name: 'passerelleMap',
          'blue': function(scene){
            addDialog("Don't walk aside...")
          },
          'red': function(scene){
            addDialog('Splash !')

            console.log(scene.game.scenes);
            scene.game.scenes['passerelle'].deactivate();
            fadeOut(scene.game.scenes['passerelle'].objects['passerelle'].sprite, 3000,
              function(){scene.game.scenes['cam'].activate()});
          }
         }
   var scene3 = new Scene1();
   var passerelle = new Object1();
   passerelle.init({name:'passerelle',
        image:'passerelle',
        map: map,
        x:0, y:0, w:1})
   scene3.init(game, {name:'passerelle', objects:[passerelle], rules:[r3]})

   //===================================================================
   var r3 = new Rule1();
   r3.init({conditions: function(scene){
             var o1 = scene.game.scenes['passerelle'].objects['passerelle'];
             var o2 = scene.objects['cam'];
             return (o2.sprite.alpha ==0 && o1.sprite.alpha==0); },

           actions: function(scene){
               // The room appears
               var o = scene.objects['cam'];
               fadeIn(o.sprite, 1000)
           }
     });
     map = {name: 'camMap',
          'blue': function(scene){
            addDialog("Nothing important here")
          },
          'red': function(scene){
            addDialog('Nice movie !')

            console.log(scene.game.scenes);
            scene.game.scenes['cam'].deactivate();
            fadeOut(scene.game.scenes['cam'].objects['cam'].sprite, 3000,
              function(){scene.game.scenes['night'].activate()});
          }
         }
   var scene3 = new Scene1();
   var cam = new Object1();
   cam.init({name:'cam',
        image:'cam',
        map: map,
        x:0, y:0, w:1})
   scene3.init(game, {name:'cam', objects:[cam], rules:[r3]})
   //===================================================================
   var r3 = new Rule1();
   r3.init({conditions: function(scene){
             var o1 = scene.game.scenes['cam'].objects['cam'];
             var o2 = scene.objects['night'];
             return (o2.sprite.alpha ==0 && o1.sprite.alpha==0); },

           actions: function(scene){
               // The room appears
               var o = scene.objects['night'];
               fadeIn(o.sprite, 1000)
           }
     });
     map = {name: 'nightMap',

          'blue': function(scene){
            addDialog('Nice star !')

            console.log(scene.game.scenes);
            scene.game.scenes['night'].deactivate();
            fadeOut(scene.game.scenes['night'].objects['night'].sprite, 3000,
              function(){scene.game.scenes['guitare'].activate()});
          }
         }
   var scene3 = new Scene1();
   var cam = new Object1();
   cam.init({name:'night',
        image:'night',
        map: map,
        x:0, y:0, w:1})
   scene3.init(game, {name:'night', objects:[cam], rules:[r3]})
   //===================================================================
   var r3 = new Rule1();
   r3.init({conditions: function(scene){
             var o1 = scene.game.scenes['night'].objects['night'];
             var o2 = scene.objects['guitare'];
             return (o2.sprite.alpha ==0 && o1.sprite.alpha==0); },

           actions: function(scene){
               // The room appears
               var o = scene.objects['guitare'];
               fadeIn(o.sprite, 1000)
           }
     });
     map = {name: 'guitareMap',

          'blue': function(scene){
            addDialog('Que guapo !')

            //console.log(scene.game.scenes);
            //scene.game.scenes['night'].deactivate();
            //fadeOut(scene.game.scenes['guitare'].objects['guitare'].sprite, 3000,
            //  function(){scene.game.scenes['guitare'].activate()});
          }
         }
   var scene3 = new Scene1();
   var cam = new Object1();
   cam.init({name:'guitare',
        image:'guitare',
        map: map,
        x:0, y:0, w:1})
   scene3.init(game, {name:'guitare', objects:[cam], rules:[r3]})

}

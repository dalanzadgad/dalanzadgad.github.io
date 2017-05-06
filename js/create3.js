function Preload() {
    var images = ["toll", "passerelle", "cam", "night", "guitare"];
    return images;
};

function Create() {
    var obj0 = new Object1();
    obj0.init({
        y: 0.1,
        text: "As I walked in the mountain, \n  I finally found that secret place \n known by very few...",
        name: "first_text",
        x: 0.1
    });
    var obj1 = new Object1();
    obj1.init({
        map: {
            name: "tollMap",
            blue: function(scene) {
                addDialog('Ladies enjoying the moment...')
            },
            green: function(scene) {
                addDialog('Pristine pond')
            },
            yellow: function(scene) {
                addDialog('Young men hanging out...')
            },
            red: function(scene) {
                addDialog('Nice waterfall...');
                console.log(scene.game.scenes);
                scene.game.scenes['toll'].deactivate();
                scene.game.scenes['title'].objects['first_text'].isVisible = false;
                scene.game.scenes['title'].objects['first_text'].sprite.alpha = 0;
                fadeOut(scene.game.scenes['toll'].objects['toll'].sprite, 3000, function() {
                    scene.game.scenes['passerelle'].activate()
                });
            }
        },
        name: "toll",
        image: "toll",
        w: 1,
        y: 0,
        x: 0
    });
    var obj2 = new Object1();
    obj2.init({
        map: {
            name: "passerelleMap",
            blue: function(scene) {
                addDialog("Don't walk aside...")
            },
            red: function(scene) {
                addDialog('Splash !');
                console.log(scene.game.scenes);
                scene.game.scenes['passerelle'].deactivate();
                fadeOut(scene.game.scenes['passerelle'].objects['passerelle'].sprite, 3000, function() {
                    scene.game.scenes['cam'].activate()
                });
            }
        },
        name: "passerelle",
        image: "passerelle",
        w: 1,
        y: 0,
        x: 0
    });
    var obj3 = new Object1();
    obj3.init({
        map: {
            name: "camMap",
            blue: function(scene) {
                addDialog('Nothing important here')
            },
            red: function(scene) {
                addDialog('Nice movie !');
                console.log(scene.game.scenes);
                scene.game.scenes['cam'].deactivate();
                fadeOut(scene.game.scenes['cam'].objects['cam'].sprite, 3000, function() {
                    scene.game.scenes['night'].activate()
                });
            }
        },
        name: "cam",
        image: "cam",
        w: 1,
        y: 0,
        x: 0
    });
    var obj4 = new Object1();
    obj4.init({
        map: {
            name: "nightMap",
            blue: function(scene) {
                addDialog('Nice star !');
                console.log(scene.game.scenes);
                scene.game.scenes['night'].deactivate();
                fadeOut(scene.game.scenes['night'].objects['night'].sprite, 3000, function() {
                    scene.game.scenes['guitare'].activate()
                });
            }
        },
        name: "night",
        image: "night",
        w: 1,
        y: 0,
        x: 0
    });
    var obj5 = new Object1();
    obj5.init({
        map: {
            name: "guitareMap",
            blue: function(scene) {
                addDialog('Que guapo !')
            }
        },
        name: "guitare",
        image: "guitare",
        w: 1,
        y: 0,
        x: 0
    });

    var rule0 = new Rule1();
    rule0.init({
        name: "rule1",
        conditions: function(scene) {
            return !(scene.objects['first_text'].isVisible);
        },
        actions: function(scene) {
            var o = scene.objects['first_text'];
            o.isVisible = true;
            fadeIn(o.sprite, 1000, function() {
                fadeOut(o.sprite, 1000, function() {
                    scene.game.scenes['title'].deactivate();
                    scene.game.scenes['toll'].activate()
                })
            });
        }
    });
    var rule1 = new Rule1();
    rule1.init({
        name: "rule2",
        conditions: function(scene) {
            var o1 = scene.game.scenes['title'].objects['first_text'];
            var o2 = scene.objects['toll'];
            return (o2.sprite.alpha == 0 && o1.sprite.alpha == 0);
        },
        actions: function(scene) {
            var o = scene.objects['toll'];
            o.animate();
            fadeIn(o.sprite, 1000)
        }
    });
    var rule2 = new Rule1();
    rule2.init({
        name: "rule3",
        conditions: function(scene) {
            var o1 = scene.game.scenes['toll'].objects['toll'];
            var o2 = scene.objects['passerelle'];
            return (o2.sprite.alpha == 0 && o1.sprite.alpha == 0);
        },
        actions: function(scene) {
            var o = scene.objects['passerelle'];
            o.animate();
            fadeIn(o.sprite, 1000)
        }
    });
    var rule3 = new Rule1();
    rule3.init({
        name: "rule4",
        conditions: function(scene) {
            var o1 = scene.game.scenes['passerelle'].objects['passerelle'];
            var o2 = scene.objects['cam'];
            return (o2.sprite.alpha == 0 && o1.sprite.alpha == 0);
        },
        actions: function(scene) {
            var o = scene.objects['cam'];
            o.animate();
            fadeIn(o.sprite, 1000)
        }
    });
    var rule4 = new Rule1();
    rule4.init({
        name: "rule5",
        conditions: function(scene) {
            var o1 = scene.game.scenes['cam'].objects['cam'];
            var o2 = scene.objects['night'];
            return (o2.sprite.alpha == 0 && o1.sprite.alpha == 0);
        },
        actions: function(scene) {
            var o = scene.objects['night'];
            o.animate();
            fadeIn(o.sprite, 1000)
        }
    });
    var rule5 = new Rule1();
    rule5.init({
        name: "rule6",
        conditions: function(scene) {
            var o1 = scene.game.scenes['night'].objects['night'];
            var o2 = scene.objects['guitare'];
            return (o2.sprite.alpha == 0 && o1.sprite.alpha == 0);
        },
        actions: function(scene) {
            var o = scene.objects['guitare'];
            o.animate();
            fadeIn(o.sprite, 1000)
        }
    });

    var title = new Scene1();
    title.init(game, {
        name: "title",
        objects: [obj0],
        rules: [rule0],
    });
    var toll = new Scene1();
    toll.init(game, {
        name: "toll",
        objects: [obj1],
        rules: [rule1],
    });
    var toll = new Scene1();
    toll.init(game, {
        name: "toll",
        objects: [obj1],
        rules: [rule1],
    });
    var passerelle = new Scene1();
    passerelle.init(game, {
        name: "passerelle",
        objects: [obj2],
        rules: [rule2],
    });
    var cam = new Scene1();
    cam.init(game, {
        name: "cam",
        objects: [obj3],
        rules: [rule3],
    });
    var night = new Scene1();
    night.init(game, {
        name: "night",
        objects: [obj4],
        rules: [rule4],
    });
    var guitare = new Scene1();
    guitare.init(game, {
        name: "guitare",
        objects: [obj5],
        rules: [rule5],
    });

    title.activate();

}
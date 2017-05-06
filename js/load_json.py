import jsbeautifier as jsb
import json
def get_types(j):
    return [[e for e in j if e['type']==i] \
        for i in ('scene', 'object', 'rule')]

def build_jscode(j):
    sc,ob,ru = get_types(j)
    jscode = ''
    hto = {}
    htr = {}
    for i, o in enumerate(ob):
        name = 'obj%s'%i
        hto[o['name']] = name
        line = 'var %s = new Object1(); %s.init({'%(name,name)
        for k,v in o.items():
            if k in ['name','image','text']:
                line += '%s:"%s",'%(k,v)
            if k in ['w','h','x','y']:
                line += '%s:%s,'%(k,v)
            if k == 'map':
                m = 'name:"%sMap",'%o['name']
                for color, f in v.items():
                    m += '%s:function(scene){%s},'%(color,jsb.beautify(f))
                line += 'map:{%s},'%m[:-1]
        jscode += line[:-1] + '});'
    jscode += '\n\n'

    for i,r in enumerate(ru):
        name = 'rule%s'%i
        htr[r['name']] = name
        line = 'var %s = new Rule1(); %s.init({'%(name, name)
        line += 'name:"%s",'%r['name']
        line += 'conditions:function(scene){%s},'%jsb.beautify(r['conditions'])
        line += 'actions:function(scene){%s}'%jsb.beautify(r['actions'])
        jscode += jsb.beautify(line)
        jscode += '});'
    jscode += '\n\n'

    for i,s in enumerate(sc):
        name = s['name']
        line = 'var %s = new Scene1(); %s.init(game, {'%(name, name)
        line += 'name:"%s",'%s['name']
        line += 'objects:[%s],'%','.join([hto[e] for e in s['objects']])
        line += 'rules:[%s],'%','.join([htr[e] for e in s['rules']])
        line += '});'
        jscode += jsb.beautify(line)

    jscode += '\n\n%s.activate();\n\n'%sc[0]['name']

    preload = 'function Preload(){var images = %s; return images;};\n\n'\
        %json.dumps([e['image'] for e in ob if 'image' in e.keys()])

    wrapcode = '%sfunction Create(){%s}'%(preload, jscode)
    return jsb.beautify(wrapcode)

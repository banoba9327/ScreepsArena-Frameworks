import { utils } from 'game';
import { Creep } from 'game/prototypes';
import { Flag } from 'arena/prototypes';
import { TaskedCreep } from "./src/TaskedCreep.mjs";
import { taskPrototypes } from "./src/Task/TaskPrototypes.mjs"

/**
 * 初期化フラグ
 * @type {boolean}
 */
let isInitialized = false;
/**
 * タスク管理しているCreep一覧
 * @type {TaskedCreep[]}
 */
const taskedCreeps = new Array();
/**
 * 攻撃目標一覧
 * @type {Flag[]}
 */
let enemyFlags;

export function loop()
{
    if(!isInitialized)
    {
        initialize();
    }

    const terminated = new Array();
    for(let creep of taskedCreeps)
    {
        // 死亡・消滅したら破棄リストへ
        if(!creep.isAlive())
        {
            console.log("terminated:", creep)
            terminated.push(creep);
            continue;
        }

        creep.update();
        creep.draw();
    }

    // 死亡・消滅したCreepの参照破棄
    for(let creep of terminated)
    {
        let index = taskedCreeps.indexOf(creep);
        taskedCreeps.splice(creep, 1);
    }
}

function initialize()
{
    const myCreeps = utils.getObjectsByPrototype(Creep).filter(object => object.my);
    enemyFlags = utils.getObjectsByPrototype(Flag).filter(object => !object.my);

    for(let creep of myCreeps)
    {
        let taskedCreep = new TaskedCreep(creep);
        taskedCreep.addTask(new taskPrototypes.creep.CaptureFlag(enemyFlags[0]));
        taskedCreeps.push(taskedCreep);
    }

    isInitialized = true;
}

function defaultLoop()
{
    var enemyFlag = utils.getObjectsByPrototype(Flag).find(object => !object.my);
    var myCreeps = utils.getObjectsByPrototype(Creep).filter(object => object.my);
    for(var creep of myCreeps) {
        creep.moveTo(enemyFlag);
    }
}
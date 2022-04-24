import { Creep } from 'game/prototypes';
import { Visual } from 'game/visual';
import { Task, TaskState } from "../Task.mjs";
import { isAlive } from "../../Utils/CreepUtility.mjs"
import { VisualLayer } from "../../VisualLayer.mjs";
import { TaskedObject } from './TaskedObject.mjs';

/** Creepのタスク実行クラス */
export class TaskedCreep extends TaskedObject
{
    /**
     * 操作対象
     * @type {Creep}
     */
    creep;

    hitsVisual = new Visual(VisualLayer.Hits, true);

    /** コンストラクタ
     * @param {Creep} creep 操作対象
     */
    constructor(creep)
    {
        if(!(creep instanceof Creep))
        {
            throw new Error("引数エラー。Creepでないオブジェクトが渡されました。", creep)
        }
        if(!creep.my)
        {
            throw new Error("引数エラー。敵軍オブジェクトが渡されました。");
        }

        super();
        this.creep = creep;
    }

    /**
     * オブジェクト識別情報
     * @returns 文字列等のコンソール出力可能なデータ
     */
    identify()
    {
        // creepをそのまま出力
        return this.creep;
    }

    /**
     * 生存しているかをbooleanで返す
     * @returns 生存していたらtrue
     */
    isAlive()
    {
        return isAlive(this.creep);
    }

    /**
     * タスク実行時の引数
     * @returns {Creep} タスクに引数として渡す情報
     */
    getTaskActionArgument()
    {
        return this.creep;
    }

    /**
     * tickごとの描画処理
     */
    draw()
    {
        this.hitsVisual.clear().text(
            this.creep.hits,
            { x: this.creep.x, y: this.creep.y - 0.5 }, // above the creep
            {
                font: '0.5',
                opacity: 0.7,
                backgroundColor: '#808080',
                backgroundPadding: '0.03'
            });
    }
}
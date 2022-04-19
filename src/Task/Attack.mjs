import { constants } from 'game';
import { Creep, Structure } from 'game/prototypes';
import { Task, TaskState } from "./Task.mjs";

/**
 * 近接攻撃タスク
 */
export class Attack extends Task
{
    /**
     * 攻撃対象
     * @type {Creep}
     */
    target;

    /** コンストラクタ
     * @param {Creep} target 攻撃対象。Structureでも可能
     */
    constructor(target)
    {
        if(!(target instanceof Creep)
            && !(target instanceof Structure))
        {
            throw new Error("引数エラー。CreepかStructureを渡してください。");
        }
        if(target.my)
        {
            throw new Error("引数エラー。友軍オブジェクトがtargetに指定されました。");
        }

        super();
        this.target = target;
    }

    /** タスク状況に合わせてTaskState列挙子を返す。
     * @param {Creep} creep 操作対象
     * @returns タスク状況に応じたTaskState列挙子
    */
    getTaskState(creep)
    {
        // targetが消滅しているか、体力がなくなっているなら完了
        if(!this.target.exists
            || (this.target.hits <= 0))
        {
            return TaskState.Completed;
        }
        // それ以外は作業中
        return TaskState.WorkInProgress;
    }

    /**
     * タスク実行
     * @param {Creep} creep 操作対象
     */
    actionInternal(creep)
    {
        // タスク実行
        const taskResult = creep.attack(this.target);
        switch(taskResult)
        {
            // 成功
            case constants.OK:
                break;
            // タスク目標が範囲外により達成できないなら目標へ向かって移動する。
            case constants.ERR_NOT_IN_RANGE:
                target.moveTo(this.target);
                break;
            // その他の結果は設計上の問題になるためコンソール出力
            default:
                throw new Error("実行失敗。エラーコード：", taskResult);
        }
    }
}
import { Creep } from 'game/prototypes';
import { TaskState } from "../../Task.mjs";
import { TargetingTask } from '../TargetingTask.mjs';
import { isAlive } from "../../../Utils/CreepUtility.mjs"

/**
 * 対象指定型の攻撃タスク用ベースクラス
 * @description 対象指定型...特定の対象に働きかけることが目的で、範囲外で実行できない場合は対象へ向かって移動が必要になるようなものを指す。
 * @override TargetingTask.taskActionのオーバーライドが必須
 */
export class TargetingAttack extends TargetingTask
{
    /** コンストラクタ
     * @param {Creep} target 攻撃対象。Structureでも可能
     */
    constructor(target)
    {
        super(target);
    }

    /** タスク状況に合わせてTaskState列挙子を返す。
     * @param {Creep} creep 操作対象
     * @returns タスク状況に応じたTaskState列挙子
     * @description 基本的にオーバーライド禁止。
    */
    getTaskState(creep)
    {
        // targetが消滅していたら完了
        if(!isAlive(this.target))
        {
            return TaskState.Completed;
        }
        // それ以外は作業中
        return TaskState.WorkInProgress;
    }
}
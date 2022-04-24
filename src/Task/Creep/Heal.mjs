import { constants } from 'game';
import { Creep } from 'game/prototypes';
import { TargetingTask } from "./TargetingTask.mjs"
import { TaskState } from "../Task.mjs";
import { isAlive } from "../../Utils/CreepUtility.mjs"

/**
 * 回復タスク
 */
export class Heal extends TargetingTask
{
    /** コンストラクタ
     * @param {Creep} target 回復対象。Structureでも可能
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

    /**
     * Creepの作業関数の呼び出し
     * @param {Creep} creep 操作対象
     * @returns {constants.CreepActionReturnCode} 作業関数の戻り値
     */
    taskAction(creep)
    {
        return creep.heal(this.target);
    }
}
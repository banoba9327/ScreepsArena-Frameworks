import { constants } from 'game';
import { Creep, Structure } from 'game/prototypes';
import { Task } from "../Task.mjs";
import { getTypeNameOf } from '../../Utils/SystemUtility.mjs';

/**
 * 対象指定型のタスク用ベースクラス
 * @description 対象指定型...特定の対象に働きかけることが目的で、範囲外で実行できない場合は対象へ向かって移動が必要になるようなものを指す。
 * @override Task.getTaskState, taskActionのオーバーライドが必須
 */
export class TargetingTask extends Task
{
    /**
     * 作業対象(作業の影響を受けるもの)
     * @type {Creep}
     */
    target;

    /** コンストラクタ
     * @param {Creep} target 作業対象(作業の影響を受けるもの)。Structureでも可能
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

    /**
     * タスク実行
     * @param {Creep} creep 操作対象
     * @description 基本的にオーバーライド禁止。
     */
    actionInternal(creep)
    {
        // タスク実行
        const taskResult = this.taskAction(creep);
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
                // MEMO : どこのクラスのtaskActionが呼び出されたかわからないのでクラス名も出力する。
                throw new Error("タスク実行失敗。クラス[", getTypeNameOf(this), "] エラーコード：", taskResult);
        }
    }

    /**
     * Creepの作業関数の呼び出し
     * @param {Creep} creep 操作対象
     * @returns {constants.CreepActionReturnCode} 作業関数の戻り値
     * @description 必ずオーバーライドすること。
     */
    taskAction(creep)
    {
        return constants.OK;
    }
}
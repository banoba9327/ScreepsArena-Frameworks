import { utils, constants } from 'game';
import { Creep, GameObject } from 'game/prototypes';
import { Task, TaskState } from "../Task.mjs";

/** 移動タスク */
export class TargetingMove extends Task
{
    /**
     * 移動目標
     * @type {GameObject}
     */
    destination;

    /** コンストラクタ
     * @param {GameObject} destination GameObjectまたはx,yプロパティを持つオブジェクト
     */
    constructor(destination)
    {
        if(!("x" in destination)
            || !("y"in destination))
        {
            throw new Error("引数エラー。x,yをプロパティとして持つオブジェクトを渡してください。");
        }

        super();
        this.destination = destination;
    }

    /** タスク状況に合わせてTaskState列挙子を返す。
     * @param {Creep} creep 操作対象
     * @returns タスク状況に応じたTaskState列挙子
    */
    getTaskState(creep)
    {
        // creepとdestinationの距離が0以下なら完了
        if(utils.getRange(creep, this.destination) <= 0)
        {
            return TaskState.Completed;
        }
        // それ以外は作業中
        return TaskState.WorkInProgress;
    }

    /**
     * タスク実行
     * @param {Creep} creep
     */
     actionInternal(creep)
     {
         // 疲労が残っているなら移動できないので終了
         if(creep.fatigue > 0)
         {
             return;
         }

         // タスク実行
         const taskResult = creep.moveTo(this.destination);
         switch(taskResult)
         {
             // 成功
             case constants.OK:
                 break;
             // その他の結果は設計上の問題になるためコンソール出力
             default:
                 throw new Error("実行失敗。エラーコード：", taskResult);
         }
     }
}
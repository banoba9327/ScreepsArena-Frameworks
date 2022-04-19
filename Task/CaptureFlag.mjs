import { constants, prototypes } from '/game';
import { Task, TaskState } from "./Task.mjs";

/** Flag占拠タスク Capture the Flag専用タスク */
export class CaptureFlag extends Task
{
    /**
     * 占拠目標
     * @type {Flag}
     */
    flag;

    /** コンストラクタ
     * @param {Flag} flag 占拠目標
     */
    constructor(flag)
    {
        if(!(flag instanceof prototypes.Flag))
        {
            throw new Error("引数エラー。Flagオブジェクトを渡してください。");
        }

        super();
        this.flag = flag;
    }

    /** タスク状況に合わせてTaskState列挙子を返す。
     * @param {Creep} creep 操作対象
     * @returns タスク状況に応じたTaskState列挙子
    */
    getTaskState(creep)
    {
        // 常に作業中 占拠することが勝利条件なので完了を調べないことにする
        // TODO : FlagがGameObjectでもなくx,yプロパティも読み取れない特殊クラスなのでこうするしかなかった。
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
        const taskResult = creep.moveTo(this.flag);
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
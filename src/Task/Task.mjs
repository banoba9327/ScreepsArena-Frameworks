import { GameObject } from 'game/prototypes';

/**
 * タスク実行状況
 */
export const TaskState = Object.freeze({
    /** 作業中 */
    WorkInProgress:0,
    /** 完了 */
    Completed:1,
    /** 今すぐは実行できないので後回し */
    PostPone:2,
});

/**
 * Creepのタスク(命令)オブジェクト
 * @description 派生クラスではコンストラクタの引数やパラメータ公開でタスク実行に必要な情報を操作させる。
 */
export class Task
{
    /** タスク状況に合わせてTaskState列挙子を返す。
     * @param {GameObject} object 操作対象
     * @returns タスク状況に応じたTaskState列挙子
     * @description 必ずオーバーライドすること。
    */
    getTaskState(object)
    {
        // 何もすることがないので完了を返す
        return TaskState.Completed;
    }

    /**
     * タスク実行
     * @param {GameObject} object
     * @description 必ずオーバーライドすること。Task.action以外から呼び出さないでください。
     */
    actionInternal(object)
    {
    }

    /**
     * タスク実行
     * @param {GameObject} object
     * @returns Taskの状況に応じたTaskState列挙子
     * @description 基本的にオーバーライド禁止
     */
    action(object)
    {
        this.actionInternal(object);
        return this.getTaskState();
    }
}
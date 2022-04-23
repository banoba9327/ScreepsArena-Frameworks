
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
 * タスク(命令)オブジェクト
 * @description 派生クラスではコンストラクタの引数やパラメータ公開でタスク実行に必要な情報を操作させる。
 */
export class Task
{
    /** タスク状況に合わせてTaskState列挙子を返す。
     * @param {Object} object タスク担当者
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
     * @param {Object} object タスク担当者
     * @description 必ずオーバーライドすること。Task.action以外から呼び出さないでください。
     */
    actionInternal(object)
    {
    }

    /**
     * タスク実行
     * @param {Object} object タスク担当者
     * @returns Taskの状況に応じたTaskState列挙子
     * @description 基本的にオーバーライド禁止
     */
    action(object)
    {
        this.actionInternal(object);
        return this.getTaskState();
    }
}
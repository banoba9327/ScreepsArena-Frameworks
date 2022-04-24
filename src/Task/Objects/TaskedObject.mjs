import { Task, TaskState } from "../Task.mjs";

/** タスク実行オブジェクトクラス */
export class TaskedObject
{
    /** 割り当てられているタスク
     * @type {Task[]}
     */
    tasks = new Array();

    /**
     * オブジェクト識別情報
     * @returns 文字列等のコンソール出力可能なデータ
     * @description オーバーライド必須。
     */
    identify()
    {
        return "unknown identify";
    }

    /**
     * タスクを実行するオブジェクトが生存しているかをbooleanで返す
     * @returns 生存していたらtrue
     */
    isAlive()
    {
        return false;
    }

    /** タスクがあるかをbooleanで返す。
     * @returns {boolean} true : タスクがある
     */
    hasTask()
    {
        return this.tasks.length != 0;
    }

    /**
     * タスク実行時の引数
     * @returns {object} タスクに引数として渡す情報
     * @description オーバーライド必須
     */
    getTaskActionArgument()
    {
        return null;
    }

    /**
     * tickごとの更新処理
     */
    update()
    {
        // タスクがなければ何もしない
        if(!this.hasTask())
        {
            console.log("仕事がありません。", this.identify);
            return;
        }
        
        let task = this.getCurrentTask();
        switch(task.action(this.getTaskActionArgument()))
        {
            // タスクが完了したら削除
            case TaskState.Completed:
                killTask(task);
                break;
        }
    }

    /** タスク追加 優先順は最低
     * @param {Task} task
     */
    pushTask(task)
    {
        if(!(task instanceof Task))
        {
            throw new Error("Task以外のオブジェクトを追加することはできません。");
        }
        this.tasks.push(task);
    }

    /** タスク削除
     * @param {Task} task
     */
    killTask(task)
    {
        let index = this.tasks.indexOf(task);
        if(!index || ((index < 0) || (index >= this.tasks.length)))
        {
            throw new Error("indexOfの結果が不正です。taskやtasksの内容を確認してください。");
        }

        this.tasks.splice(index, 1);
    }

    /**
     * 完了済みタスクの削除
     */
    killCompleted()
    {
        for (let i = 0; i < this.tasks.length; ++i)
        {
            // 完了タスク以外は無視
            if (this.tasks[i].getTaskState(this.creep) != TaskState.Completed)
            {
                continue;
            }
            // 完了タスクは削除
            this.tasks.splice(i, 1);
            if (i > 0) {--i;}
        }
    }

    /** 現在のtickで実行するタスクを返す。
     * @returns {Task} 最優先タスク
     */
    getCurrentTask()
    {
        for (let i = 0; i < this.tasks.length; ++i)
        {
            if(this.tasks[i].getTaskState(this.creep) != TaskState.WorkInProgress)
            {
                continue;
            }
            return this.tasks[i];
        }
        return null;
    }
}
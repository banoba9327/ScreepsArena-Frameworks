import { Creep } from 'game/prototypes';
import { Visual } from 'game/visual';
import { Task, TaskState } from "./Task/Task.mjs";
import { isAlive } from "./Utils/CreepUtility.mjs"
import { VisualLayer } from "./VisualLayer.mjs";

/** Creepのタスク実行クラス */
export class TaskedCreep
{
    /**
     * 操作対象
     * @type {Creep}
     */
    creep;

    /** 割り当てられているタスク
     * @type {Task[]}
     */
    tasks = new Array();

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
        this.creep = creep;
    }

    /**
     * 生存しているかをbooleanで返す
     * @returns 生存していたらtrue
     */
    isAlive()
    {
        return isAlive(this.creep);
    }

    /** タスクがあるかをbooleanで返す。
     * @returns {boolean} true : タスクがある
     */
    hasTask()
    {
        return this.tasks.length != 0;
    }

    /**
     * tickごとの更新処理
     */
    update()
    {
        // タスクがなければ何もしない
        if(!this.hasTask())
        {
            console.log("仕事がありません。", this.creep);
            return;
        }
        
        let task = this.getCurrentTask();
        switch(task.action(this.creep))
        {
            // タスクが完了したら削除
            case TaskState.Completed:
                killTask(task);
                break;
        }
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

    /** タスク追加 優先順は最低
     * @param {Task} task
     */
    addTask(task)
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
            arr.splice(i, 1);
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
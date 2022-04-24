import { Creep } from 'game/prototypes';
import { TaskedObject } from './TaskedObject.mjs';

/** 分隊(Creepの最小集合体)のタスク実行クラス */
export class TaskedSquad extends TaskedObject
{
	/**
	 * 分隊名
	 * @type {String}
	 */
	name;

	/**
	 * 構成員
	 * @type {TaskedCreep[]}
	 */
	members = new Array();
 
	/** コンストラクタ
	 * @param {String} name 分隊名
	 * @param {Creep[]} members 構成員
	 */
	constructor(name, members)
	{
		super();
		this.name = name;
		for(let member of members)
		{
			this.members.push(new TaskedCreep(member));
		}
	}

	/**
	 * オブジェクト識別情報
	 * @returns 文字列等のコンソール出力可能なデータ
	 */
	identify()
	{
		return "squad[" + this.name + "]";
	}

	/**
	 * タスクを実行するオブジェクトが生存しているかをbooleanで返す
	 * @returns 生存していたらtrue
	 */
	isAlive()
	{
		// creepが１つでも生きていれば生存している
		for(let member of this.members)
		{
			if(member.isAlive()) return true;
		}
		return false;
	}

	/**
	 * タスク実行時の引数
	 * @returns {TaskedCreep[]} タスクに引数として渡す情報
	 */
	getTaskActionArgument()
	{
		return this.members;
	}

	/**
	 * tickごとの更新処理
	 */
	update()
	{
		this.rollCall();

		// 自身の更新
		super.update();

		// メンバーの更新
		for(let member of this.members)
		{
			member.update();
			member.draw();
		}
	}

	/**
	 * 点呼(反応のないメンバーの破棄)
	 */
	rollCall()
	{
		for (let i = 0; i < this.members.length; ++i)
		{
			// 生存メンバーは無視
			if (this.members[i].isAlive())
			{
				continue;
			}
			// 死んだので削除
			console.log("terminated:", this.members[i]);
			this.members.splice(i, 1);
			if (i > 0) {--i;}
		}
	}
}
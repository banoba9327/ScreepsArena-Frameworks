import { Creep } from 'game/prototypes';
import { Task } from "../Task.mjs";
import { TaskedCreep } from '../Objects/TaskedCreep.mjs';

/**
 * 分隊タスク用ベースクラス
 * @description 毎tickの状況判断の役割も持ちます。
 * @override initialize, Task.getTaskState, Task.actionInternalのオーバーライドが必須
 */
 export class SquadTask extends Task
 {
	/**
	 * 初期化フラグ trueなら初期化済み
	 */
	isInitialized = false;

	/**
	 * フェーズ処理
	 * @type {function} 引数としてmembersを渡すこと
	 */
	phaseProcess = null;

	 /**
	  * 特定フェーズ中のデータ
	  */
	phaseData = null;

	/**
	 * 初期化
	 * @param {TaskedCreep[]} members 構成員
	 * @description 必ずオーバーライドすること。
	 */
	initialize(members)
	{
		this.isInitialized = true;
	}

	/**
	 * タスク実行
	 * @param {TaskedCreep[]} members 構成員
	 */
	actionInternal(members)
	{
		if(!this.isInitialized)
		{
			this.initialize(members);
		}
	}

	/**
	 * フェーズ変更
	 * @param {function} processFunction 
	 */
	changePhase(processFunction)
	{
		this.phaseProcess = processFunction;
		this.phaseData = new Object();
	}
 }
import { constants } from 'game';
import { Creep } from 'game/prototypes';
import { TargetingAttack } from "./TargetingAttack.mjs"

/**
 * 遠距離攻撃タスク
 */
export class RangedAttack extends TargetingAttack
{
	/** コンストラクタ
	 * @param {Creep} target 攻撃対象。Structureでも可能
	 */
	constructor(target)
	{
		super(target);
	}

	/**
	 * Creepの作業関数の呼び出し
	 * @param {Creep} creep 操作対象
	 * @returns {constants.CreepActionReturnCode} 作業関数の戻り値
	 */
	 taskAction(creep)
	 {
		 return creep.rangedAttack(this.target);
	 }
}
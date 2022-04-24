// MEMO : フレームワーク外部から参照するクラスを一括でインポートするためのソースコード

import { TargetingMove } from "./TargetingMove.mjs";
import { MeleeAttack } from "./Attack/MeleeAttack.mjs";
import { RangedAttack } from "./Attack/RangedAttack.mjs";
import { Heal } from "./Heal.mjs";
import { CaptureFlag } from "./CaptureFlag.mjs";

/**
 * Creep用Taskクラス一覧
 */
export const creepTaskTypes = Object.freeze({
	TargetingMove: TargetingMove,
    MeleeAttack: MeleeAttack,
    RangedAttack: RangedAttack,
    Heal: Heal,
    CaptureFlag: CaptureFlag,
});
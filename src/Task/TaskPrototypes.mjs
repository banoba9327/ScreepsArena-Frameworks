// MEMO : フレームワーク外部から参照するクラスを一括でインポートするためのソースコード

import { Task } from "./Task.mjs";

import { TaskedCreep } from "./Objects/TaskedCreep.mjs";
import { TaskedObject } from "./Objects/TaskedObject.mjs";

import { CaptureFlag } from "./Creep/CaptureFlag.mjs";
import { TargetingMove } from "./Creep/TargetingMove.mjs";
import { MeleeAttack } from "./Creep/Attack/MeleeAttack.mjs";
import { RangedAttack } from "./Creep/Attack/RangedAttack.mjs";
import { Heal } from "./Creep/Heal.mjs";


/**
 * Taskクラス一覧
 */
export const prototypes = Object.freeze({
    Task: Task,
    object: {
        TaskedObject: TaskedObject,
        TaskedCreep: TaskedCreep,
        
    },
    creep: {
        TargetingMove: TargetingMove,
        MeleeAttack: MeleeAttack,
        RangedAttack: RangedAttack,
        Heal: Heal,
        CaptureFlag: CaptureFlag,
    }
});
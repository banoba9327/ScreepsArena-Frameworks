// MEMO : フレームワーク外部から参照するクラスを一括でインポートするためのソースコード

import { Task } from "./Task.mjs";
import { CaptureFlag } from "./Creep/CaptureFlag.mjs";
import { Move } from "./Creep/Move.mjs";
import { MeleeAttack } from "./Creep/Attack/MeleeAttack.mjs";

export const taskPrototypes = {
    Task: Task,
    creep: {
        Move: Move,
        MeleeAttack: MeleeAttack,
        CaptureFlag: CaptureFlag,
    }
}
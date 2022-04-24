// MEMO : フレームワーク外部から参照するクラスを一括でインポートするためのソースコード

import { Task } from "./Task.mjs";
import { creepTaskTypes } from "./Creep/CreepTaskTypes.mjs";

/**
 * Taskクラス一覧
 */
export const taskTypes = Object.freeze({
	Task: Task,
	creep: creepTaskTypes,
});
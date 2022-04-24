// MEMO : フレームワーク外部から参照するクラスを一括でインポートするためのソースコード

import { TaskedCreep } from "./Objects/TaskedCreep.mjs";
import { TaskedObject } from "./Objects/TaskedObject.mjs";
import { TaskedSquad } from "./Objects/TaskedSquad.mjs";

/**
 * Taskクラス一覧
 */
export const taskedObjectTypes = Object.freeze({
	TaskedObject: TaskedObject,
	TaskedCreep: TaskedCreep,
	TaskedSquad: TaskedSquad,
});
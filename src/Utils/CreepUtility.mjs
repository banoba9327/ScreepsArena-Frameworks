import { constants } from 'game';
import { Creep } from 'game/prototypes';

/**
 * Creepを構成するパーツの合計コストを算出して返す。
 * @param {number[]} bodyParts 
 * @returns 
 */
 export function calculateCost(bodyParts)
 {
     var sum = 0;
     for(var parts of bodyParts)
     {
         sum += constants.BODYPART_COST[parts];
     }
     return sum;
 }

/**
 * Creepが盤面上で生存しているか
 * @param {Creep} creep 判定対象。Structureを渡しても問題ない。
 * @returns {boolean} 生存していたらtrue
 */
export function isAlive(creep)
{
    return creep.exists && (creep.hits > 0)
}

/**
 * Creepが指定したパーツを所持しているか
 * @param {Creep} creep 判定対象。
 * @param {number} bodyParts
 * @returns {boolean} 所持していたらtrue
 */
export function hasBodyParts(creep, bodyParts)
{
    return creep.body.indexOf(bodyParts) >= 0;
}

/**
 * 対象の型名を返す。
 * @param {Object} target 型名を取り出す対象。
 * @returns {string} 型名
 * @link https://pisuke-code.com/javascript-get-exact-data-type/
 */
export function getTypeNameOf(target)
{
	var funcNameRegex = /function (.{1,})\(/;
	var results = (funcNameRegex).exec((target).constructor.toString());
	return (results && results.length > 1) ? results[1] : "";
}
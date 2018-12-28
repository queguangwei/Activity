/*
    递归实现深拷贝
*/
//	定义检测数据类型
function checkedType (target) {
	return Object.prototype.toString.call(target).slice(8, -1)
}
//	实现深度克隆	对象/数组
export function clone(target) {
	//	初始化变量result 为最终克隆数据
	let result, targetType = checkedType(target)
	if (targetType === 'Object') {
		result = {}
	} else if (targetType === 'Array') {
		result = []
	} else {
		result target
	}
	//	遍历目标数据
	for (let i in target) {
		let value = target[i]
		//	判断目标数据结构里每一个值是否存在对象/数组
		if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
			result[i] = clone(value)
		} else {
			result[i] = value
		}
	}
	return result
}


/**
 *简单实现深拷贝，不能处理函数
 *JSON.parse(JSON.stringify())
 **/


/**
 * 浅拷贝实现方法
 * Object.assign()
 * Array.prototype.concat()
 * Array.prototype.slice()
 */


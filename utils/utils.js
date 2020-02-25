
/**
 * 实现无线层级树形数据结构
 * @param { Array } source 原数组
 * @param { String } id 对象的id字段
 * @param { String } parentId 对象的父级id字段
 * @param { String } children 对象的子级字段名
 */
export const getTreeData = (source, id, parentId, children) => {
  let cloneData = JSON.parse(JSON.stringify(source));
  return cloneData.filter(p => {
    let branchArr = cloneData.filter(c => p[id] === c[parentId]);
    branchArr.length > 0 ? (p[children] = branchArr) : "";
    return p[parentId] === 0;
  });
};

# 常用工具方法


## 数组转换为 Map 结构

```ts
/**
 * 将数组转换为 Map 结构
 * @param list 原始数组
 * @param getKey 从数组元素中提取键的函数
 * @param getValue 从数组元素中提取值的函数（可选，默认为元素本身）
 * @returns 生成的 Map 对象
 */
function listToMap<T, K extends string | number | symbol, V>(
  list: T[],
  getKey: (item: T) => K,
  getValue?: (item: T) => V
): Record<K, V> {
  return list.reduce((map, item) => {
    const key = getKey(item);
    const value = getValue ? getValue(item) : item as unknown as V;
    return { ...map, [key]: value };
  }, {} as Record<K, V>);
}
```
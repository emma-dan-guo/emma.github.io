class LFUCache<T> {
  private frequencyHashSet: Map<number, Array<{ element: T; index: number }>> =
    new Map();
  private cacheList: Array<T> = [];
  private valueToKeyMap: Map<T, number> = new Map();
  private keyToFrequencyMap: Map<number, number> = new Map();
  private minFrequencyCount: number = Infinity;
  constructor(public limit: number) {}

  get(element: T) {
    const index = this.valueToKeyMap.get(element);
    if (index) {
      this.increaseFreq({ index, element });
      return this.cacheList[index];
    }
    return undefined;
  }

  private increaseFreq(params: { element: T; index: number }) {
    const { element, index } = params;
    // 频率+1
    const prevFreq = this.keyToFrequencyMap.get(index) ?? 0;
    const newFreq = prevFreq + 1;
    this.keyToFrequencyMap.set(index, newFreq);

    // 更新最小频率
    if (this.minFrequencyCount > newFreq) {
      this.minFrequencyCount = newFreq;
    }

    // 更新频率映射表
    const prevList = this.frequencyHashSet.get(prevFreq);
    if (prevList) {
      const i = prevList.findIndex((p) => params === p);
      if (i !== undefined) {
        prevList.splice(i, 1);
        this.frequencyHashSet.set(prevFreq, prevList);
        const newFreqList = this.frequencyHashSet.get(newFreq);
        this.frequencyHashSet.set(newFreq, [
          ...(newFreqList ?? []),
          { element, index },
        ]);
      }
    }
  }

  /**
   * 移除频率最小的那个
   */
  removeMinFreq() {
    const { index, element } = this.frequencyHashSet
      .get(this.minFrequencyCount)
      ?.shift()!;
    this.cacheList.splice(index, 1);
    this.valueToKeyMap.delete(element);
    if (this.frequencyHashSet.get(this.minFrequencyCount)?.length === 0) {
      this.frequencyHashSet.delete(this.minFrequencyCount);
    }
  }

  push(element: T) {
    if (this.isExceedLimit()) {
      this.removeMinFreq();
    }
    const index = this.cacheList.push(element);
    this.increaseFreq({ index, element });
  }

  isExceedLimit() {
    return this.limit <= this.cacheList.length;
  }

  toString() {
    return this.cacheList.toString();
  }
}

const test = () => {
  const cache = new LFUCache(3);
  cache.push(2);
  cache.push(3);
  cache.push(4);
  cache.push(5);
  console.log("===ca", cache.toString());
};

test();

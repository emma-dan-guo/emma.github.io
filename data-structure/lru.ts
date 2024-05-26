export class Node<T> {
  constructor(
    public element: T,
    public next?: Node<T>,
    public prev?: Node<T>
  ) {}
}

class DoubleLinkedList<T> {
  protected head?: Node<T>;
  protected count: number = 0;

  push(element: T) {
    if (!this.head) {
      this.head = new Node(element);
    } else {
      const lastNode = this.getNodeByIndex(this.count - 1);
      if (lastNode) {
        lastNode.next = new Node(element, undefined, lastNode);
      }
    }
    this.count++;
  }

  getNodeByIndex(index: number) {
    if (index < 0 || index + 1 > this.count) {
      return undefined;
    }
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (i === index) {
        return current;
      }
      current = current?.next;
    }
  }

  replace(element: T, index: number): boolean {
    const current = this.getNodeByIndex(index);
    if (current) {
      const prev = current.prev;
      const next = current.next;
      const newNode = new Node(element, next, prev);
      if (prev) {
        prev.next = newNode;
      }
      if (next) {
        next.prev = newNode;
      }
      if (!prev) {
        this.head = newNode;
      }
      return true;
    }
    return false;
  }

  insert(element: T, index: number): boolean {
    const current = this.getNodeByIndex(index);
    if (current) {
      const next = current.next;
      const newNode = new Node(element, next, current);
      current.next = newNode;
      this.count++;
    }
    return false;
  }

  removeByIndex(index: number) {
    const current = this.getNodeByIndex(index);
    if (current) {
      const prev = current.prev;
      const next = current.next;
      if (prev) {
        prev.next = next;
      }
      if (next) {
        next.prev = prev;
      }
      if (!prev) {
        this.head = next;
      }
      this.count--;
    }
  }

  toString() {
    let str = "";
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      //   console.log("==current", current);
      str += current?.element;
      if (current) {
        current = current?.next;
      }
    }
    return str;
  }

  size() {
    return this.count;
  }
}

class LRUCache<T> {
  private cacheMap: Map<T, number> = new Map();
  private doubleLinkedList;
  constructor(public limitCount: number) {
    this.doubleLinkedList = new DoubleLinkedList<T>();
  }

  push(element: T) {
    if (this.isExceedLimit()) {
      this.doubleLinkedList.removeByIndex(0);
    }
    this.cacheMap.set(element, this.doubleLinkedList.size());
    this.doubleLinkedList.push(element);
  }

  get(element: T) {
    // 说明之前存在过
    const eleIndex = this.cacheMap.get(element);
    if (eleIndex !== undefined) {
      const node = this.doubleLinkedList.getNodeByIndex(eleIndex);
      this.doubleLinkedList.removeByIndex(eleIndex);
      this.doubleLinkedList.insert(element, this.doubleLinkedList.size() - 1);
      this.cacheMap.set(element, this.doubleLinkedList.size() - 1);
      return node;
    }
  }

  toString() {
    return this.doubleLinkedList.toString();
  }

  isExceedLimit() {
    return this.limitCount <= this.size();
  }

  size() {
    return this.doubleLinkedList.size();
  }
}

const test = () => {
  const cache = new LRUCache<number>(3);
  cache.push(1);
  cache.push(2);
  cache.push(3);
  console.log("====>", cache.toString());
  cache.push(4);
  console.log("====>", cache.toString());
};

test();

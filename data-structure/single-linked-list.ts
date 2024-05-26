export class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}

/**
 * 实现一个单链表的增删改查
 */
class SingleLinkedList<T> {
  protected head?: Node<T>;
  protected count: number = 0;
  /**
   * 向链表后面添加一个元素
   */
  push(element: T) {
    if (!this.head) {
      this.head = new Node(element);
    } else {
      // 找到最后一个元素添加
      const current = this.getNodeAt(this.count - 1);
      if (current) {
        current.next = new Node(element);
      }
    }
    this.count++;
  }

  /**
   * 移除特定Index的元素
   */
  removeAt(index: number) {
    let current;
    if (index < 0 || index + 1 > this.count) {
      return false;
    }
    if (index === 0) {
      current = this.head;
      this.head = this.head?.next;
    } else {
      let prev = this.getNodeAt(index - 1)!;
      current = prev.next;
      prev.next = prev.next?.next;
    }
    this.count--;
    return current?.element;
  }

  remove(element: Node<T>) {
    const index = this.getIndexOf(element);
    if (index) {
      this.removeAt(index);
    }
  }

  /**
   * 获得指定index对应的节点
   */
  getNodeAt(index: number): Node<T> | undefined {
    let node = this.head;
    for (let i = 0; i < this.count; i++) {
      if (index === i) {
        return node;
      }
      node = node?.next;
    }
    return undefined;
  }

  /**
   * 获得指定元素对应的index
   */
  getIndexOf(node: Node<T>) {
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (current === node) {
        return i;
      }
      current = current?.next;
    }
  }

  /**
   * 指定节点写入元素
   */
  insert(element: T, index: number) {
    // 在头节点插入
    const ele = new Node(element);

    if (index === 0) {
      const tmp = this.head;
      this.head = ele;
      this.head.next = tmp;
      return true;
    }

    // 在其他位置插入
    let current = this.getNodeAt(index - 1);
    if (current) {
      const tmp = current.next;
      current.next = ele;
      current.next.next = tmp;
      this.count++;
      return true;
    }
    return false;
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
}

const testSingleLinkedList = () => {
  const singleList = new SingleLinkedList<number>();
  singleList.push(2);
  singleList.push(3);
  singleList.push(4);
  singleList.push(5);
  singleList.push(6);
  console.log("singleList", singleList);
  console.log(singleList.toString());
  singleList.removeAt(2);
  console.log("singleList new", singleList.toString());
};

testSingleLinkedList();

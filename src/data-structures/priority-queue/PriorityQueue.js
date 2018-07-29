import MinHeap from '../heap/MinHeap';
import Comparator from '../../utils/comparator/Comparator';

// It is the same as min heap except that when comparing to elements
// we take into account not element's value but rather its priority.
export default class PriorityQueue extends MinHeap {
  constructor() {
    super();
    this.priorities = {};
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * @param {*} item
   * @param {number} [priority]
   * @return {PriorityQueue}
   */
  add(item, priority = 0) {
    this.priorities[item] = priority;
    super.add(item);

    return this;
  }
}

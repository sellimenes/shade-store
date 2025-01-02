type Listener = () => void;

class CartStore {
  private count: number = 0;
  private listeners: Set<Listener> = new Set();

  getCount() {
    return this.count;
  }

  setCount(count: number) {
    this.count = count;
    this.notifyListeners();
  }

  increment() {
    this.count++;
    this.notifyListeners();
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
      this.notifyListeners();
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
      return undefined;
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const cartStore = new CartStore(); 
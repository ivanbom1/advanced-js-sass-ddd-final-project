export type EventCallback = (payload?: any) => void;

class Observer {
  private listeners: Record<string, EventCallback[]> = {};

  subscribe(eventName: string, callback: EventCallback): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  unsubscribe(eventName: string, callback: EventCallback): void {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName] = this.listeners[eventName].filter(
      (cb) => cb !== callback,
    );
  }

  emit(eventName: string, payload?: any): void {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName].forEach((callback) => callback(payload));
  }
}

export const eventBus = new Observer();

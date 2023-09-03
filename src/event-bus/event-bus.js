class EventBus {
  constructor() {
    this.subscribers = {};
  }

  subscribe(eventType, callback) {
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    this.subscribers[eventType].push(callback);
  }

  unSubscribe(eventType, callback) {
    if (this.subscribers[eventType]) {
      const index = this.subscribers[eventType].indexOf(callback);
      if (index !== -1) this.subscribers[eventType].splice(index, 1);
    }
  }

  publish(eventType, data) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType].forEach((callback) => {
        callback(data);
      });
    }
  }
  clear(eventType) {
    if (this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
  }
}

export default EventBus;

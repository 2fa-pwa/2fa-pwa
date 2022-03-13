import { makeAutoObservable } from "mobx";

import { Action, Blocker, Listener, To, Location, BrowserHistory } from "history";

import { createMemoryHistory } from "history";

const browserHistory = createMemoryHistory() as BrowserHistory;

export class RouterService implements BrowserHistory {

  location: Location = null as never;

  action: Action = null as never;

  locked: boolean = false;

  constructor() {
    makeAutoObservable(this);
  };

  setLocked = (locked: boolean) => {
    this.locked = locked;
  };

  updateState = () => {
    const { location, action } = browserHistory;
    this.location = location;
    this.action = action;
  };

  createHref = (to: To) => {
    const result = browserHistory.createHref(to);
    this.updateState();
    return result;
  };

  push = (to: To, state = {}) => {
    if (this.locked) {
      return;
    } else {
      browserHistory.push(to, state);
      this.updateState();
    }
  };

  replace = (to: To, state = {}) => {
    if (this.locked) {
      return;
    } else {
      browserHistory.replace(to, state);
      this.updateState();
    }
  };

  go = (delta: number) => {
    if (this.locked) {
      return;
    } else {
      browserHistory.go(delta);
      this.updateState();
    }
  };

  back = () => {
    if (this.locked) {
      return;
    } else {
      browserHistory.back();
      this.updateState();
    }
  };

  forward = () => {
    if (this.locked) {
      return;
    } else {
      browserHistory.forward();
      this.updateState();
    }
  };

  listen = (listener: Listener) => {
    const result = browserHistory.listen(listener);
    this.updateState();
    return result;
  };

  block = (blocker: Blocker) => {
    const result = browserHistory.block(blocker);
    this.updateState();
    return result;
  };

};

export default RouterService;

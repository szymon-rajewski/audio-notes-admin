export type RoutingPathKey = 'main' | 'users';

export default class RoutingPath {
  static MAIN = '/zirrai-panel-admin';
  static USERS = '/zirrai-panel-admin/users';
  static LOGIN = '/zirrai-panel-admin/login';

  private static MAP = {
    main: RoutingPath.MAIN,
    users: RoutingPath.USERS,
    login: RoutingPath.LOGIN,
  };

  static get(name: RoutingPathKey): RoutingPath {
    return this.MAP[name];
  }

  static getAll() {
    return [this.MAIN, this.USERS];
  }
}

export type OfferViewTypeKey =
  | 'widok-na-gory'
  | 'widok-na-morze'
  | 'widok-na-pole-golfowe'
  | 'widok-na-ogrod'
  | 'widok-panoramiczny';

export default class OfferViewType {
  static WIDOK_NA_GORY = 'widok-na-gory';
  static WIDOK_NA_MORZE = 'widok-na-morze';
  static WIDOK_NA_POLE_GOLFOWE = 'widok-na-pole-golfowe';
  static WIDOK_NA_OGROD = 'widok-na-ogrod';
  static WIDOK_PANORAMICZNY = 'widok-panoramiczny';

  static MAP = {
    'widok-na-gory': 'Widok na góry',
    'widok-na-morze': 'Widok na morze',
    'widok-na-pole-golfowe': 'Widok na pole golfowe',
    'widok-na-ogrod': 'Widok na ogród',
    'widok-panoramiczny': 'Widok panoramiczny',
  };

  static getLabel(key: OfferViewTypeKey): string {
    return this.MAP[key];
  }
}

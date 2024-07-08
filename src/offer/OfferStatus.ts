export type OfferStatusKey = '0' | '1';

export default class OfferStatus {
  static NOT_AVAILABLE = '0';
  static AVAILABLE = '1';

  static MAP = {
    '0': 'Niedostępny',
    '1': 'Dostępny',
  };

  static getLabel(key: OfferStatusKey) {
    return this.MAP[key];
  }
}

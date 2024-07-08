export type OfferMarketKey = 'rynek-wtorny' | 'rynek-pierwotny';

export default class OfferMarket {
  static PRIMARY = 'rynek-pierwotny';
  static SECONDARY = 'rynek-wtorny';

  static MAP = {
    'rynek-pierwotny': 'Rynek pierwotny',
    'rynek-wtorny': 'Rynek wtórny',
  };

  static getLabel(key: OfferMarketKey) {
    return this.MAP[key];
  }
}

export type OfferPropertyTypeKey =
  | 'willa'
  | 'apartament'
  | 'penthouse'
  | 'duplex-penthouse'
  | 'dom-szeregowy'
  | 'dom-blizniak';

export default class OfferPropertyType {
  static WILLA = 'willa';
  static APARTAMENT = 'apartament';
  static PENTHOUSE = 'penthouse';
  static DUPLEX_PENTHOUSE = 'duplex-penthouse';
  static DOM_SZEREGOWY = 'dom-szeregowy';
  static DOM_BLIZNIAK = 'dom-blizniak';

  static MAP = {
    willa: 'Willa',
    apartament: 'Apartament',
    penthouse: 'Penthouse',
    'duplex-penthouse': 'Duplex Penthouse',
    'dom-szeregowy': 'Dom szeregowy',
    'dom-blizniak': 'Dom bliźniak',
  };

  static getLabel(key: OfferPropertyTypeKey): string {
    return this.MAP[key];
  }
}

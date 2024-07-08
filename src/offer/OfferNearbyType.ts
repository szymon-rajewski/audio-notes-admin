export type OfferNearbyTypeKey =
  | 'blisko-sklepow'
  | 'blisko-miasta'
  | 'blisko-portu'
  | 'blisko-szkol'
  | 'blisko-plazy'
  | 'blisko-pol-golfowych'
  | 'blisko-placu-zabaw-dla-dzieci'
  | 'blisko-restauracji';

export default class OfferNearbyType {
  static BLISKO_SKLEPOW = 'blisko-sklepow';
  static BLISKO_MIASTA = 'blisko-miasta';
  static BLISKO_PORTU = 'blisko-portu';
  static BLISKO_SZKOL = 'blisko-szkol';
  static BLISKO_PLAZY = 'blisko-plazy';
  static BLISKO_POL_GOLFOWYCH = 'blisko-pol-golfowych';
  static BLISKO_PLACU_ZABAW_DLA_DZIECI = 'blisko-placu-zabaw-dla-dzieci';
  static BLISKO_RESTAURACJI = 'blisko-restauracji';

  static MAP = {
    'blisko-sklepow': 'Blisko sklepów',
    'blisko-miasta': 'Blisko miasta',
    'blisko-portu': 'Blisko portu',
    'blisko-szkol': 'Blisko szkół',
    'blisko-plazy': 'Blisko plaży',
    'blisko-pol-golfowych': 'Blisko pól golfowych',
    'blisko-placu-zabaw-dla-dzieci': 'Blisko placu zabaw dla dzieci',
    'blisko-restauracji': 'Blisko restauracji',
  };

  static getLabel(key: OfferNearbyTypeKey): string {
    return this.MAP[key];
  }
}

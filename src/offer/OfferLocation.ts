export type OfferLocationKey =
  | 'costa-del-sol-wszystkie-lokalizacje'
  | 'marbella'
  | 'marbella-golden-mile'
  | 'marbella-wschodnia'
  | 'puerto-banus'
  | 'nueva-andalucia'
  | 'san-pedro-de-alcantara'
  | 'estepona'
  | 'benahavis'
  | 'benalmadena'
  | 'mijas-costa'
  | 'casares'
  | 'fuengirola'
  | 'sotogrande'
  | 'manilva'
  | 'ojen'
  | 'guadalmina'
  | 'istan'
  | 'la-zagaleta';

export default class OfferLocation {
  static COSTA_DEL_SOL_WSZYSTKIE = 'costa-del-sol-wszystkie-lokalizacje';
  static MARBELLA = 'marbella';
  static MARBELLA_GOLDEN_MILE = 'marbella-golden-mile';
  static MARBELLA_WSCHODNIA = 'marbella-wschodnia';
  static PUERTO_BANUS = 'puerto-banus';
  static NUEVA_ANDALUCIA = 'nueva-andalucia';
  static SAN_PEDRO_DE_ALCANTARA = 'san-pedro-de-alcantara';
  static ESTEPONA = 'estepona';
  static BENAHAVIS = 'benahavis';
  static BENALMADENA = 'benalmadena';
  static MIJAS_COSTA = 'mijas-costa';
  static CASARES = 'casares';
  static FUENGIROLA = 'fuengirola';
  static SOTOGRANDE = 'sotogrande';
  static MANILVA = 'manilva';
  static OJEN = 'ojen';
  static GUADALMINA = 'guadalmina';
  static ISTAN = 'istan';
  static LA_ZAGALETA = 'la-zagaleta';

  static MAP = {
    'costa-del-sol-wszystkie-lokalizacje':
      'Costa del Sol - Wszystkie Lokalizacje',
    marbella: 'Marbella',
    'marbella-golden-mile': 'Marbella Golden Mile',
    'marbella-wschodnia': 'Marbella Wschodnia',
    'puerto-banus': 'Puerto Banus',
    'nueva-andalucia': 'Nueva Andalucia',
    'san-pedro-de-alcantara': 'San Pedro de Alcantara',
    estepona: 'Estepona',
    benahavis: 'Benahavis',
    benalmadena: 'Benalmadena',
    'mijas-costa': 'Mijas Costa',
    casares: 'Casares',
    fuengirola: 'Fuengirola',
    sotogrande: 'Sotogrande',
    manilva: 'Manilva',
    ojen: 'Ojen',
    guadalmina: 'Guadalmina',
    istan: 'Istan',
    'la-zagaleta': 'La Zagaleta',
  };

  static getLabel(key: OfferLocationKey) {
    return this.MAP[key];
  }
}

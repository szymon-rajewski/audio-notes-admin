import { Photo } from './Photo';

export default interface Offer {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  status: string;
  refId: string;

  price?: number;
  priceFrom?: number;
  priceTo?: number;

  description: string;

  city: string;
  market: string;
  propertyTypes: string[];

  nearbyTypes?: string[];
  viewTypes?: string[];

  createYear?: number;
  buildingFinishDate?: string;

  bedroomCount?: number;
  bedroomCountFrom?: number;
  bedroomCountTo?: number;
  bathroomCount?: number;
  bathroomCountFrom?: number;
  bathroomCountTo?: number;

  toiletCount?: number;
  livingRoom?: boolean;
  floorNumber?: number;
  garage?: boolean;
  garden?: boolean;
  geoDirection?: number;
  privateIndoorPool?: boolean;
  publicIndoorPool?: boolean;
  privateOutdoorPool?: boolean;
  publicOutdoorPool?: boolean;
  poolWithHeating?: boolean;

  parkingSpaceCount?: number;
  parkingSpaceCountFrom?: number;
  parkingSpaceCountTo?: number;
  indoorArea?: number;
  indoorAreaFrom?: number;
  indoorAreaTo?: number;
  landArea?: number;
  landAreaFrom?: number;
  landAreaTo?: number;
  terraceArea?: number;
  terraceAreaFrom?: number;
  terraceAreaTo?: number;
  terraceCount?: number;
  terraceCountFrom?: number;
  terraceCountTo?: number;

  coveredTerrace?: boolean;
  roofTerrace?: boolean;
  balcony?: boolean;
  antiBurglarDoors?: boolean;
  fullyFurniture?: boolean;
  openKitchen?: boolean;
  fullyEquippedKitchen?: boolean;
  diningRoom?: boolean;
  utilityRoom?: boolean;
  alarm?: boolean;
  closedNeighbourhood?: boolean;
  airConditioning?: boolean;
  floorHeating?: boolean;
  fireplace?: boolean;
  dolbySystem?: boolean;
  laundryRoom?: boolean;
  internet?: boolean;
  electricRollerShutters?: boolean;
  wardroom?: boolean;
  cinemaRoom?: boolean;
  wineCellar?: boolean;
  jacuzzi?: boolean;
  gym?: boolean;
  sauna?: boolean;
  grill?: boolean;
  photos?: Photo[];
  previewPhotos?: Photo[];
}

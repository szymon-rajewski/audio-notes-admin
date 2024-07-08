import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Offer from '../../offer/Offer';
import Page from '../Page/Page';
import { useTranslation } from 'react-i18next';
import { Separator } from '../ui/Separator';
import { CardTitle } from '../ui/Card/CardTitle';
import '../Form/ImageUploader.css';
import { HOST } from '../../api/config';
import OfferStatus, { OfferStatusKey } from '../../offer/OfferStatus';
import OfferLocation, { OfferLocationKey } from '../../offer/OfferLocation';
import OfferMarket, { OfferMarketKey } from '../../offer/OfferMarket';
import OfferPropertyType, {
  OfferPropertyTypeKey,
} from '../../offer/OfferPropertyType';
import OfferNearbyType, {
  OfferNearbyTypeKey,
} from '../../offer/OfferNearbyType';
import OfferViewType, { OfferViewTypeKey } from '../../offer/OfferViewType';

export default function OfferDetailsPage() {
  const { t } = useTranslation();
  const { resultId } = useParams();
  const location = useLocation();
  const data = location.state as Offer;

  if (!resultId || !Object.keys(data).length) {
    return <h2>Nie znaleziono oferty</h2>;
  }

  const getBooleanToString = (value?: boolean) => (value ? 'Tak' : 'Nie');

  const priceText = data.price
    ? data.price
    : data.priceFrom && data.priceTo
      ? `${data.priceFrom} - ${data.priceTo}`
      : '-';

  const bedroomText = data.bedroomCount
    ? data.bedroomCount
    : data.bedroomCountFrom && data.bedroomCountTo
      ? `${data.bedroomCountFrom} - ${data.bedroomCountTo}`
      : '-';

  const bathroomText = data.bathroomCount
    ? data.bathroomCount
    : data.bathroomCountFrom && data.bathroomCountTo
      ? `${data.bathroomCountFrom} - ${data.bathroomCountTo}`
      : '-';

  const parkingSpaceCountText = data.parkingSpaceCount
    ? data.parkingSpaceCount
    : data.parkingSpaceCountFrom && data.parkingSpaceCountTo
      ? `${data.parkingSpaceCountFrom} - ${data.parkingSpaceCountTo}`
      : '-';

  const indoorAreaText = data.indoorArea
    ? data.indoorArea
    : data.indoorAreaFrom && data.indoorAreaTo
      ? `${data.indoorAreaFrom} - ${data.indoorAreaTo}`
      : '-';

  const landAreaText = data.landArea
    ? data.landArea
    : data.landAreaFrom && data.landAreaTo
      ? `${data.landAreaFrom} - ${data.landAreaTo}`
      : '-';

  const terraceAreaText = data.terraceArea
    ? data.terraceArea
    : data.terraceAreaFrom && data.terraceAreaTo
      ? `${data.terraceAreaFrom} - ${data.terraceAreaTo}`
      : '-';

  const terraceCountText = data.terraceCount
    ? data.terraceCount
    : data.terraceCountFrom && data.terraceCountTo
      ? `${data.terraceCountFrom} - ${data.terraceCountTo}`
      : '-';

  return (
    <Page>
      <div className="size-full">
        <CardTitle className="text-lg font-bold pb-6">Oferta</CardTitle>
        <div className="pb-5">
          <p className="font-bold">{t('offer.name')}</p>
          <p className="text-label-secondary text-sm">{data.name || '-'}</p>
        </div>
        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.refId')}</p>
            <p className="text-label-secondary text-sm">{data.refId || '-'}</p>
          </div>
          <div>
            <p className="font-bold">{t('offer.status')}</p>
            <p className="text-label-secondary text-sm">
              {OfferStatus.getLabel(data.status as OfferStatusKey) || '-'}
            </p>
          </div>
        </div>
        <div className="pb-5">
          <div>
            <p className="font-bold">{t('offer.price')}</p>
            <p className="text-label-secondary text-sm">{priceText}</p>
          </div>
        </div>
        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.city')}</p>
            <p className="text-label-secondary text-sm">
              {OfferLocation.getLabel(data.city as OfferLocationKey) || '-'}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.market')}</p>
            <p className="text-label-secondary text-sm">
              {OfferMarket.getLabel(data.market as OfferMarketKey) || '-'}
            </p>
          </div>
        </div>
        <div className="pb-5">
          <div>
            <p className="font-bold">{t('offer.propertyTypes')}</p>
            <p className="text-label-secondary text-sm">
              {data?.propertyTypes?.length
                ? (data.propertyTypes || [])
                    .map((name) =>
                      OfferPropertyType.getLabel(name as OfferPropertyTypeKey)
                    )
                    .join(', ')
                : '-'}
            </p>
          </div>
        </div>
        <div className="pb-5">
          <div>
            <p className="font-bold">{t('offer.nearbyTypes')}</p>
            <p className="text-label-secondary text-sm">
              {data?.nearbyTypes?.length
                ? (data.nearbyTypes || [])
                    .map((name) =>
                      OfferNearbyType.getLabel(name as OfferNearbyTypeKey)
                    )
                    .join(', ')
                : '-'}
            </p>
          </div>
        </div>
        <div className="pb-5">
          <div>
            <p className="font-bold">{t('offer.viewTypes')}</p>
            <p className="text-label-secondary text-sm">
              {data?.viewTypes?.length
                ? (data.viewTypes || [])
                    .map((name) =>
                      OfferViewType.getLabel(name as OfferViewTypeKey)
                    )
                    .join(', ')
                : '-'}
            </p>
          </div>
        </div>
        <div className="pb-5">
          <p className="font-bold">{t('offer.description')}</p>
          <p className="text-label-secondary text-sm">
            {data.description || '-'}
          </p>
        </div>
        <Separator className="mb-5" />
        <CardTitle className="text-lg font-bold">Zdjęcia</CardTitle>
        <div className="flex flex-wrap gap-8 pt-5 pb-5">
          {data?.previewPhotos?.length ? (
            (data?.previewPhotos || []).map((photo, index) => (
              <div
                className="preview-img-container"
                key={`oferta-img-${data._id}-${index}`}
              >
                <img
                  className="preview-img aspect-video object-cover w-full"
                  src={`${HOST}/img/${photo.filename}`}
                  alt={`preview ${index}`}
                />
              </div>
            ))
          ) : (
            <p className="text-label-secondary text-sm">Brak zdjęć</p>
          )}
        </div>
        <Separator className="mb-5" />
        <p className="text-lg font-bold pb-5">Dodatkowe</p>
        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.createYear')}</p>
            <p className="text-label-secondary text-sm">
              {data.createYear || '-'}
            </p>
          </div>
          <div>
            <p className="font-bold">
              {t('offer.buildingFinishDate')} <span>(miesiąc/rok)</span>
            </p>
            <p className="text-label-secondary text-sm">
              {data.buildingFinishDate || '-'}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.bedroomCount')}</p>
            <p className="text-label-secondary text-sm">{bedroomText}</p>
          </div>
          <div>
            <p className="font-bold">{t('offer.bathroomCount')}</p>
            <p className="text-label-secondary text-sm">{bathroomText}</p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.toiletCount')}</p>
            <p className="text-label-secondary text-sm">
              {data.toiletCount || '-'}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.floorNumber')}</p>
            <p className="text-label-secondary text-sm">
              {data.floorNumber || '-'}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.parkingSpaceCount')}</p>
            <p className="text-label-secondary text-sm">
              {parkingSpaceCountText}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.geoDirection')}</p>
            <p className="text-label-secondary text-sm">
              {data.geoDirection || '-'}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.indoorArea')}</p>
            <p className="text-label-secondary text-sm">{indoorAreaText}</p>
          </div>
          <div>
            <p className="font-bold">{t('offer.landArea')}</p>
            <p className="text-label-secondary text-sm">{landAreaText}</p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.terraceArea')}</p>
            <p className="text-label-secondary text-sm">{terraceAreaText}</p>
          </div>
          <div>
            <p className="font-bold">{t('offer.terraceCount')}</p>
            <p className="text-label-secondary text-sm">{terraceCountText}</p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.livingRoom')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.livingRoom)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.garage')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.garage)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.garden')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.garden)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.privateIndoorPool')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.privateIndoorPool)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.publicIndoorPool')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.publicIndoorPool)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.privateOutdoorPool')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.privateOutdoorPool)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.publicOutdoorPool')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.publicOutdoorPool)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.poolWithHeating')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.poolWithHeating)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.coveredTerrace')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.coveredTerrace)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.roofTerrace')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.roofTerrace)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.balcony')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.balcony)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.antiBurglarDoors')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.antiBurglarDoors)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.fullyFurniture')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.fullyFurniture)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.openKitchen')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.openKitchen)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.fullyEquippedKitchen')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.fullyEquippedKitchen)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.diningRoom')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.diningRoom)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.utilityRoom')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.utilityRoom)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.alarm')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.alarm)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.closedNeighbourhood')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.closedNeighbourhood)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.airConditioning')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.airConditioning)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.floorHeating')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.floorHeating)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.fireplace')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.fireplace)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.dolbySystem')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.dolbySystem)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.laundryRoom')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.laundryRoom)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.internet')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.internet)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.electricRollerShutters')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.electricRollerShutters)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.wardroom')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.wardroom)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.cinemaRoom')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.cinemaRoom)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.wineCellar')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.wineCellar)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.jacuzzi')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.jacuzzi)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.gym')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.gym)}
            </p>
          </div>
          <div>
            <p className="font-bold">{t('offer.sauna')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.sauna)}
            </p>
          </div>
        </div>

        <div className="columns-2 pb-5">
          <div>
            <p className="font-bold">{t('offer.grill')}</p>
            <p className="text-label-secondary text-sm">
              {getBooleanToString(data.grill)}
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}

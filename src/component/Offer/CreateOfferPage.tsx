import React, { useEffect, useState } from 'react';
import Page from '../Page/Page';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { CardTitle } from '../ui/Card/CardTitle';
import { Separator } from '../ui/Separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, UseFormSetValue } from 'react-hook-form';
import { Card } from '../ui/Card/Card';
import { CardHeader } from '../ui/Card/CardHeader';
import { CardContent } from '../ui/Card/CardContent';
import { InputWithLabel } from '../ReusableElements/InputWithLabel';
import { useNavigate } from 'react-router-dom';
import RoutingPath from '../../routing/RoutingPath';
import { useAuth } from '../AuthenticationContextProvider';
import { useToast } from '../ui/Toast/UseToast';
import SelectWithLabel, {
  SelectWithLabelItem,
} from '../ReusableElements/SelectWithLabel';
import CreateOfferForm, {
  CreateOfferFormKey,
} from '../../offer/CreateOfferForm';
import { ImageUploader } from '../Form/ImageUploader';
import OfferApi from '../../api/OfferApi';
import Loading from '../Loading/Loading';
import ResizableTextareaField from '../Form/ResizableTextareaField';
import CheckboxWithText from '../Form/CheckboxWithText';
import MultipleSelectWithLabel, {
  MultipleSelectItem,
} from '../ReusableElements/MultipleSelectWithLabel';
import { Switch } from '../ui/Switch';
import { SwitchField } from '../ui/SwitchField';
import { Label } from '../ui/Label';
import ImageFile from '../../offer/ImageFile';

const STATUS_LIST: SelectWithLabelItem[] = [
  {
    label: 'Dostępny',
    value: '1',
  },
  {
    label: 'Niedostępny',
    value: '0',
  },
];

const BOOL_LIST: SelectWithLabelItem[] = [
  {
    label: 'Tak',
    value: 'true',
  },
  {
    label: 'Nie',
    value: 'false',
  },
];

export const LOCATION_LIST: SelectWithLabelItem[] = [
  {
    value: 'costa-del-sol-wszystkie-lokalizacje',
    label: 'Costa del Sol - Wszystkie Lokalizacje',
  },
  {
    value: 'marbella',
    label: 'Marbella',
  },
  {
    value: 'marbella-golden-mile',
    label: 'Marbella Golden Mile',
  },
  {
    value: 'marbella-wschodnia',
    label: 'Marbella Wschodnia',
  },
  {
    value: 'puerto-banus',
    label: 'Puerto Banus',
  },
  {
    value: 'nueva-andalucia',
    label: 'Nueva Andalucia',
  },
  {
    value: 'san-pedro-de-alcantara',
    label: 'San Pedro de Alcantara',
  },
  {
    value: 'estepona',
    label: 'Estepona',
  },
  {
    value: 'benahavis',
    label: 'Benahavis',
  },
  {
    value: 'benalmadena',
    label: 'Benalmadena',
  },
  {
    value: 'mijas-costa',
    label: 'Mijas Costa',
  },
  {
    value: 'casares',
    label: 'Casares',
  },
  {
    value: 'fuengirola',
    label: 'Fuengirola',
  },
  {
    value: 'sotogrande',
    label: 'Sotogrande',
  },
  {
    value: 'manilva',
    label: 'Manilva',
  },
  {
    value: 'ojen',
    label: 'Ojen',
  },
  {
    value: 'guadalmina',
    label: 'Guadalmina',
  },
  {
    value: 'istan',
    label: 'Istan',
  },
  {
    value: 'la-zagaleta',
    label: 'La Zagaleta',
  },
];

export const MARKET_LIST: SelectWithLabelItem[] = [
  {
    value: 'rynek-wtorny',
    label: 'Rynek wtórny',
  },
  {
    value: 'rynek-pierwotny',
    label: 'Rynek pierwotny',
  },
];

const PROPERTY_LIST: MultipleSelectItem[] = [
  {
    value: 'willa',
    label: 'Willa',
  },
  {
    value: 'apartament',
    label: 'Apartament',
  },
  {
    value: 'penthouse',
    label: 'Penthouse',
  },
  {
    value: 'duplex-penthouse',
    label: 'Duplex Penthouse',
  },
  {
    value: 'dom-szeregowy',
    label: 'Dom szeregowy',
  },
  {
    value: 'dom-blizniak',
    label: 'Dom bliźniak',
  },
];

const NEARBY_LIST: MultipleSelectItem[] = [
  {
    value: 'blisko-sklepow',
    label: 'Blisko sklepów',
  },
  {
    value: 'blisko-miasta',
    label: 'Blisko miasta',
  },
  {
    value: 'blisko-portu',
    label: 'Blisko portu',
  },
  {
    value: 'blisko-szkol',
    label: 'Blisko szkół',
  },
  {
    value: 'blisko-plazy',
    label: 'Blisko plaży',
  },
  {
    value: 'blisko-pol-golfowych',
    label: 'Blisko pól golfowych',
  },
  {
    value: 'blisko-placu-zabaw-dla-dzieci',
    label: 'Blisko placu zabaw dla dzieci',
  },
  {
    value: 'blisko-restauracji',
    label: 'Blisko restauracji',
  },
];

const VIEW_LIST: MultipleSelectItem[] = [
  {
    value: 'widok-na-gory',
    label: 'Widok na góry',
  },
  {
    value: 'widok-na-morze',
    label: 'Widok na morze',
  },
  {
    value: 'widok-na-pole-golfowe',
    label: 'Widok na pole golfowe',
  },
  {
    value: 'widok-na-ogrod',
    label: 'Widok na ogród',
  },
  {
    value: 'widok-panoramiczny',
    label: 'Widok panoramiczny',
  },
];

const schema = z.object({
  name: z.string().min(1, {
    message: 'Podaj nazwę',
  }),
  status: z.string().min(1, {
    message: 'Podaj status dostępności',
  }),
  refId: z.string().min(1, {
    message: 'Podaj numer referencyjny',
  }),
  price: z.coerce
    .number({
      invalid_type_error: 'Cena musi być liczbą',
    })
    .int({
      message: 'Cena nie może zawierać przecinków',
    })
    .optional(),
  priceFrom: z.coerce
    .number({
      invalid_type_error: 'Cena musi być liczbą',
    })
    .int({
      message: 'Cena nie może zawierać przecinków',
    })
    .optional(),
  priceTo: z.coerce
    .number({
      invalid_type_error: 'Cena musi być liczbą',
    })
    .int({
      message: 'Cena nie może zawierać przecinków',
    })
    .optional(),
  description: z.string({ required_error: 'Podaj opis' }).min(1, {
    message: 'Podaj opis',
  }),
  city: z
    .string({
      required_error: 'Wybierz lokalizację',
    })
    .min(1, {
      message: 'Wybierz lokalizację',
    }),
  market: z
    .string({
      required_error: 'Wybierz rynek',
    })
    .min(1, {
      message: 'Wybierz rynek',
    }),
  propertyTypes: z
    .array(z.any())
    .min(1, { message: 'Wybierz przynajmniej jeden typ' }),
  nearbyTypes: z.array(z.any()).optional(),
  viewTypes: z.array(z.any()).optional(),
  createYear: z.coerce.number().optional(),
  buildingFinishDate: z.string().optional(),
  bedroomCount: z.coerce.number().optional(),
  bedroomCountFrom: z.coerce.number().optional(),
  bedroomCountTo: z.coerce.number().optional(),
  bathroomCount: z.coerce.number().optional(),
  bathroomCountFrom: z.coerce.number().optional(),
  bathroomCountTo: z.coerce.number().optional(),
  toiletCount: z.coerce.number().optional(),
  livingRoom: z.boolean().optional(),
  floorNumber: z.coerce.number().optional(),
  garage: z.boolean().optional(),

  garden: z.boolean().optional(),
  geoDirection: z.coerce.number().optional(),
  privateIndoorPool: z.boolean().optional(),
  publicIndoorPool: z.boolean().optional(),
  privateOutdoorPool: z.boolean().optional(),
  publicOutdoorPool: z.boolean().optional(),
  poolWithHeating: z.boolean().optional(),

  parkingSpaceCount: z.coerce.number().optional(),
  parkingSpaceCountFrom: z.coerce.number().optional(),
  parkingSpaceCountTo: z.coerce.number().optional(),
  indoorArea: z.coerce.number().optional(),
  indoorAreaFrom: z.coerce.number().optional(),
  indoorAreaTo: z.coerce.number().optional(),
  landArea: z.coerce.number().optional(),
  landAreaFrom: z.coerce.number().optional(),
  landAreaTo: z.coerce.number().optional(),
  terraceArea: z.coerce.number().optional(),
  terraceAreaFrom: z.coerce.number().optional(),
  terraceAreaTo: z.coerce.number().optional(),
  terraceCount: z.coerce.number().optional(),
  terraceCountFrom: z.coerce.number().optional(),
  terraceCountTo: z.coerce.number().optional(),

  coveredTerrace: z.boolean().optional(),
  roofTerrace: z.boolean().optional(),
  balcony: z.boolean().optional(),
  antiBurglarDoors: z.boolean().optional(),
  fullyFurniture: z.boolean().optional(),
  openKitchen: z.boolean().optional(),
  fullyEquippedKitchen: z.boolean().optional(),
  diningRoom: z.boolean().optional(),
  utilityRoom: z.boolean().optional(),
  alarm: z.boolean().optional(),
  closedNeighbourhood: z.boolean().optional(),
  airConditioning: z.boolean().optional(),
  floorHeating: z.boolean().optional(),
  fireplace: z.boolean().optional(),
  dolbySystem: z.boolean().optional(),
  laundryRoom: z.boolean().optional(),
  internet: z.boolean().optional(),
  electricRollerShutters: z.boolean().optional(),
  wardroom: z.boolean().optional(),
  cinemaRoom: z.boolean().optional(),
  wineCellar: z.boolean().optional(),
  jacuzzi: z.boolean().optional(),
  gym: z.boolean().optional(),
  sauna: z.boolean().optional(),
  grill: z.boolean().optional(),
  photos: z.array(z.any()).optional(),
});

interface CreateOfferPageProps {
  onClick?: () => void;
}

type SetValueFunction = (field: string, value: any) => void;

export default function CreateOfferPage({ onClick }: CreateOfferPageProps) {
  const { userId } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
  const [allUrls, setAllUrls] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [isPriceRange, setIsPriceRange] = useState<boolean>(false);
  const [isBedroomCountRange, setIsBedroomCountRange] =
    useState<boolean>(false);
  const [isBathroomCountRange, setIsBathroomCountRange] =
    useState<boolean>(false);

  const [isParkingSpaceCountRange, setIsParkingSpaceCountRange] =
    useState<boolean>(false);
  const [isIndoorAreaRange, setIsIndoorAreaRange] = useState<boolean>(false);
  const [isLandAreaRange, setIsLandAreaRange] = useState<boolean>(false);
  const [isTerraceAreaRange, setIsTerraceAreaRange] = useState<boolean>(false);
  const [isTerraceCountRange, setIsTerraceCountRange] =
    useState<boolean>(false);

  useEffect(() => {
    return () => {
      allUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateOfferForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: '1',
      city: 'costa-del-sol-wszystkie-lokalizacje',
      market: 'rynek-wtorny',
      propertyTypes: ['apartament'],
      createYear: 2024,
      buildingFinishDate: '01/2024',
      photos: [],
    },
  });

  const onSubmit = async (data: CreateOfferForm) => {
    setLoading(true);
    try {
      if (!userId) {
        throw new Error('No user ID');
      }
      const now = new Date();
      const response = await new OfferApi().create({
        ...data,
        description: data.description,
        userId,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      });
      if (!response.id) {
        throw new Error('No offer ID');
      }
      const photoList = Array.from(selectedFiles).sort(
        (a, b) => a.order - b.order
      );

      if (photoList?.length) {
        const formData = new FormData();
        photoList.forEach((image) => {
          formData.append('files', image.file);
        });
        await new OfferApi().updatePhotos(userId, response.id, formData);
      }

      toast({
        title: 'Sukces',
        description: 'Dodano ofertę',
      });
      navigate(RoutingPath.SAVED);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Błąd',
        description: '',
      });
      console.log(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldRangeVisibilityChange = (
    value: boolean,
    setValue: UseFormSetValue<CreateOfferForm>,
    setFieldRangeVisibility: (value: boolean) => void,
    singleField: CreateOfferFormKey,
    fromField: CreateOfferFormKey,
    toField: CreateOfferFormKey
  ) => {
    setFieldRangeVisibility(value);
    if (value) {
      setValue(singleField, undefined);
    } else {
      setValue(fromField, undefined);
      setValue(toField, undefined);
    }
  };

  const handlePriceRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsPriceRange,
      'price',
      'priceFrom',
      'priceTo'
    );
  };

  const handleBedroomCountRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsBedroomCountRange,
      'bedroomCount',
      'bedroomCountFrom',
      'bedroomCountTo'
    );
  };

  const handleBathroomCountRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsBathroomCountRange,
      'bathroomCount',
      'bathroomCountFrom',
      'bathroomCountTo'
    );
  };

  const handleParkingSpaceCountRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsParkingSpaceCountRange,
      'parkingSpaceCount',
      'parkingSpaceCountFrom',
      'parkingSpaceCountTo'
    );
  };

  const handleIndoorAreaRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsIndoorAreaRange,
      'indoorArea',
      'indoorAreaFrom',
      'indoorAreaTo'
    );
  };

  const handleLandAreaRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsLandAreaRange,
      'landArea',
      'landAreaFrom',
      'landAreaTo'
    );
  };

  const handleTerraceAreaRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsTerraceAreaRange,
      'terraceArea',
      'terraceAreaFrom',
      'terraceAreaTo'
    );
  };

  const handleTerraceCountRangeVisibilityChange = (value: boolean) => {
    handleFieldRangeVisibilityChange(
      value,
      setValue,
      setIsTerraceCountRange,
      'terraceCount',
      'terraceCountFrom',
      'terraceCountTo'
    );
  };

  const handleReset = () => {
    try {
      reset();
      setSelectedFiles([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilesChange = (newFiles: ImageFile[]) => {
    const urls = newFiles.map((file) => file.src);
    const newUrls: string[] = [...allUrls, ...urls];
    setAllUrls(newUrls);
    setSelectedFiles(newFiles);
  };

  const handleImageOrderChange = (value: number, currentIndex: number) => {
    const copiedFiles = [...selectedFiles];
    const newFiles = copiedFiles.map((file, index) => ({
      ...file,
      order: currentIndex === index ? value : file.order,
    }));
    setSelectedFiles(newFiles);
  };

  if (loading) {
    return <Loading viewportHeight />;
  }

  if (errors) {
    console.log(errors);
  }

  return (
    <Page>
      <Card className="mx-auto max-w-[1200px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Dodaj ofertę</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="columns-2">
              <InputWithLabel
                register={register}
                errors={errors}
                name="name"
                placeholder={t('offer.name')}
                label={t('offer.name')}
              />
              <InputWithLabel
                register={register}
                errors={errors}
                name="refId"
                placeholder={t('offer.refId')}
                label={t('offer.refId')}
              />
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2">
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectWithLabel
                      value={value}
                      label={t('offer.status')}
                      error={errors?.status?.message || ''}
                      options={STATUS_LIST}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className="w-1/2 pl-2">
                {isPriceRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">
                      {t('offer.price')} {<span>(€)</span>}
                    </Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="priceFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="priceTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="price"
                    placeholder={t('offer.price')}
                    label={t('offer.price')}
                    labelExplain={<span>(€)</span>}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handlePriceRangeVisibilityChange}
                  />
                </div>
              </div>
            </div>
            <div className="columns-2">
              <Controller
                name="city"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectWithLabel
                    value={value}
                    label={t('offer.city')}
                    error={errors?.city?.message || ''}
                    options={LOCATION_LIST}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="market"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectWithLabel
                    value={value}
                    label={t('offer.market')}
                    error={errors?.market?.message || ''}
                    options={MARKET_LIST}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="propertyTypes"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MultipleSelectWithLabel
                    options={PROPERTY_LIST}
                    value={value || []}
                    label={t('offer.propertyTypes')}
                    error={errors?.propertyTypes?.message || ''}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="nearbyTypes"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MultipleSelectWithLabel
                    options={NEARBY_LIST}
                    value={value || []}
                    label={t('offer.nearbyTypes')}
                    error={errors?.nearbyTypes?.message || ''}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="viewTypes"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MultipleSelectWithLabel
                    options={VIEW_LIST}
                    value={value || []}
                    label={t('offer.viewTypes')}
                    error={errors?.viewTypes?.message || ''}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="mb-5">
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ResizableTextareaField
                    value={value}
                    placeholder={t('offer.description')}
                    label={t('offer.description')}
                    onChange={(text) => {
                      onChange(text);
                    }}
                    error={errors?.description?.message || ''}
                  />
                )}
              />
            </div>

            <Separator className="mb-5" />
            <ImageUploader
              files={selectedFiles}
              onSelect={handleFilesChange}
              onChangeOrder={handleImageOrderChange}
            />
            <Separator className="mb-5" />
            <p className="text-lg font-bold mb-5">Dodatkowe</p>
            <div className="columns-2">
              <InputWithLabel
                register={register}
                errors={errors}
                name="createYear"
                placeholder={t('offer.createYear')}
                label={t('offer.createYear')}
              />
              <InputWithLabel
                register={register}
                errors={errors}
                name="buildingFinishDate"
                placeholder={t('offer.buildingFinishDate')}
                label={t('offer.buildingFinishDate')}
                labelExplain={<span>(miesiąc/rok)</span>}
              />
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2">
                {isBedroomCountRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">
                      {t('offer.bedroomCount')}
                    </Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="bedroomCountFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="bedroomCountTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="bedroomCount"
                    placeholder={t('offer.bedroomCount')}
                    label={t('offer.bedroomCount')}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handleBedroomCountRangeVisibilityChange}
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                {isBathroomCountRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">
                      {t('offer.bathroomCount')}
                    </Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="bathroomCountFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="bathroomCountTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="bathroomCount"
                    placeholder={t('offer.bathroomCount')}
                    label={t('offer.bathroomCount')}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handleBathroomCountRangeVisibilityChange}
                  />
                </div>
              </div>
            </div>
            <div className="columns-2">
              <InputWithLabel
                register={register}
                errors={errors}
                name="toiletCount"
                placeholder={t('offer.toiletCount')}
                label={t('offer.toiletCount')}
              />
              <InputWithLabel
                register={register}
                errors={errors}
                name="floorNumber"
                placeholder={t('offer.floorNumber')}
                label={t('offer.floorNumber')}
              />
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2">
                {isParkingSpaceCountRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">
                      {t('offer.parkingSpaceCount')}
                    </Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="parkingSpaceCountFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="parkingSpaceCountTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="parkingSpaceCount"
                    placeholder={t('offer.parkingSpaceCount')}
                    label={t('offer.parkingSpaceCount')}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handleParkingSpaceCountRangeVisibilityChange}
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <InputWithLabel
                  register={register}
                  errors={errors}
                  name="geoDirection"
                  placeholder={t('offer.geoDirection')}
                  label={t('offer.geoDirection')}
                />
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2 pr-2">
                {isIndoorAreaRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">{t('offer.indoorArea')}</Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="indoorAreaFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="indoorAreaTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="indoorArea"
                    placeholder={t('offer.indoorArea')}
                    label={t('offer.indoorArea')}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handleIndoorAreaRangeVisibilityChange}
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                {isLandAreaRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">{t('offer.landArea')}</Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="landAreaFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="landAreaTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="landArea"
                    placeholder={t('offer.landArea')}
                    label={t('offer.landArea')}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handleLandAreaRangeVisibilityChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2 pr-2">
                {isTerraceAreaRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">
                      {t('offer.terraceArea')}
                    </Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="terraceAreaFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="terraceAreaTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="terraceArea"
                    placeholder={t('offer.terraceArea')}
                    label={t('offer.terraceArea')}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handleTerraceAreaRangeVisibilityChange}
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                {isTerraceCountRange ? (
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-bold">
                      {t('offer.terraceCount')}
                    </Label>
                    <div className="flex">
                      <div className="w-1/2 pr-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="terraceCountFrom"
                          placeholder={t('offer.from')}
                          marginBottom={false}
                        />
                      </div>
                      <div className="w-1/2 pl-2">
                        <InputWithLabel
                          register={register}
                          errors={errors}
                          name="terraceCountTo"
                          placeholder={t('offer.to')}
                          marginBottom={false}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <InputWithLabel
                    register={register}
                    errors={errors}
                    name="terraceCount"
                    placeholder={t('offer.terraceCount')}
                    label={t('offer.terraceCount')}
                    marginBottom={false}
                  />
                )}
                <div className="pt-2 pb-5">
                  <SwitchField
                    label="Podaj przedział"
                    onChange={handleTerraceCountRangeVisibilityChange}
                  />
                </div>
              </div>
            </div>

            <div className="columns-2">
              <Controller
                name="livingRoom"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.livingRoom')}
                    name="livingRoom"
                    error={errors?.livingRoom?.message}
                  />
                )}
              />
              <Controller
                name="garage"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.garage')}
                    name="garage"
                    error={errors?.garage?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="garden"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.garden')}
                    name="garden"
                    error={errors?.garden?.message}
                  />
                )}
              />
              <Controller
                name="privateIndoorPool"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.privateIndoorPool')}
                    name="privateIndoorPool"
                    error={errors?.privateIndoorPool?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="publicIndoorPool"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.publicIndoorPool')}
                    name="publicIndoorPool"
                    error={errors?.publicIndoorPool?.message}
                  />
                )}
              />
              <Controller
                name="privateOutdoorPool"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.privateOutdoorPool')}
                    name="privateOutdoorPool"
                    error={errors?.privateOutdoorPool?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="publicOutdoorPool"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.publicOutdoorPool')}
                    name="publicOutdoorPool"
                    error={errors?.publicOutdoorPool?.message}
                  />
                )}
              />
              <Controller
                name="poolWithHeating"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.poolWithHeating')}
                    name="poolWithHeating"
                    error={errors?.poolWithHeating?.message}
                  />
                )}
              />
            </div>

            <div className="columns-2">
              <Controller
                name="coveredTerrace"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.coveredTerrace')}
                    name="coveredTerrace"
                    error={errors?.coveredTerrace?.message}
                  />
                )}
              />
              <Controller
                name="roofTerrace"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.roofTerrace')}
                    name="roofTerrace"
                    error={errors?.roofTerrace?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="balcony"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.balcony')}
                    name="balcony"
                    error={errors?.balcony?.message}
                  />
                )}
              />
              <Controller
                name="antiBurglarDoors"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.antiBurglarDoors')}
                    name="antiBurglarDoors"
                    error={errors?.antiBurglarDoors?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="fullyFurniture"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.fullyFurniture')}
                    name="fullyFurniture"
                    error={errors?.fullyFurniture?.message}
                  />
                )}
              />
              <Controller
                name="openKitchen"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.openKitchen')}
                    name="openKitchen"
                    error={errors?.openKitchen?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="fullyEquippedKitchen"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.fullyEquippedKitchen')}
                    name="fullyEquippedKitchen"
                    error={errors?.fullyEquippedKitchen?.message}
                  />
                )}
              />
              <Controller
                name="diningRoom"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.diningRoom')}
                    name="diningRoom"
                    error={errors?.diningRoom?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="utilityRoom"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.utilityRoom')}
                    name="utilityRoom"
                    error={errors?.utilityRoom?.message}
                  />
                )}
              />
              <Controller
                name="alarm"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.alarm')}
                    name="alarm"
                    error={errors?.alarm?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="closedNeighbourhood"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.closedNeighbourhood')}
                    name="closedNeighbourhood"
                    error={errors?.closedNeighbourhood?.message}
                  />
                )}
              />
              <Controller
                name="airConditioning"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.airConditioning')}
                    name="airConditioning"
                    error={errors?.airConditioning?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="floorHeating"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.floorHeating')}
                    name="floorHeating"
                    error={errors?.floorHeating?.message}
                  />
                )}
              />
              <Controller
                name="fireplace"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.fireplace')}
                    name="fireplace"
                    error={errors?.fireplace?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="dolbySystem"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.dolbySystem')}
                    name="dolbySystem"
                    error={errors?.dolbySystem?.message}
                  />
                )}
              />
              <Controller
                name="laundryRoom"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.laundryRoom')}
                    name="laundryRoom"
                    error={errors?.laundryRoom?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="internet"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.internet')}
                    name="internet"
                    error={errors?.internet?.message}
                  />
                )}
              />
              <Controller
                name="electricRollerShutters"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.electricRollerShutters')}
                    name="electricRollerShutters"
                    error={errors?.electricRollerShutters?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="wardroom"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.wardroom')}
                    name="wardroom"
                    error={errors?.wardroom?.message}
                  />
                )}
              />
              <Controller
                name="cinemaRoom"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.cinemaRoom')}
                    name="cinemaRoom"
                    error={errors?.cinemaRoom?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="wineCellar"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.wineCellar')}
                    name="wineCellar"
                    error={errors?.wineCellar?.message}
                  />
                )}
              />
              <Controller
                name="jacuzzi"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.jacuzzi')}
                    name="jacuzzi"
                    error={errors?.jacuzzi?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="gym"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.gym')}
                    name="gym"
                    error={errors?.gym?.message}
                  />
                )}
              />
              <Controller
                name="sauna"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.sauna')}
                    name="sauna"
                    error={errors?.sauna?.message}
                  />
                )}
              />
            </div>
            <div className="columns-2">
              <Controller
                name="grill"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CheckboxWithText
                    value={value === true}
                    onChange={onChange}
                    label={t('offer.grill')}
                    name="grill"
                    error={errors?.grill?.message}
                  />
                )}
              />
            </div>
            <Button className="my-5 w-full" type="submit">
              Dodaj ofertę
            </Button>
            <Button
              className="w-full"
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Wyczyść
            </Button>
          </CardContent>
        </form>
      </Card>
    </Page>
  );
}

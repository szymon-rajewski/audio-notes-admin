import React, { MouseEvent, useState } from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { InputWithLabel } from '../ReusableElements/InputWithLabel';
import SelectWithLabel, {
  SelectWithLabelItem,
} from '../ReusableElements/SelectWithLabel';
import { AdditionalDetail } from '../../offer/CreateOfferForm';

const CATEGORY_LIST: SelectWithLabelItem[] = [
  {
    label: 'Belki stalowe',
    value: '0',
  },
  {
    label: 'Drewno',
    value: '3',
  },
  {
    label: 'Żelbetonowe',
    value: '6',
  },
];

type CreateAdditionalDetailFrom = {
  name: string;
  iconUrl: string;
};

const schema = z.object({
  name: z.string().min(1, {
    message: 'Podaj nazwę',
  }),
  iconUrl: z.string().min(1, {
    message: 'Wybierz ikonę',
  }),
});

interface AdditionalDetailListProps {
  data: AdditionalDetail[];
  onAdd: (detail: AdditionalDetail) => void;
}
export default function AdditionalDetailList({
  data,
  onAdd,
}: AdditionalDetailListProps) {
  const { t } = useTranslation();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateAdditionalDetailFrom>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CreateAdditionalDetailFrom) => {
    try {
      onAdd(data);
    } catch (errors) {
      console.error(errors);
    } finally {
      setIsFormOpen(false);
    }
  };

  const openForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsFormOpen(true);
  };

  return (
    <div>
      {data.length
        ? data.map(({ iconUrl, name }, index) => (
            <div key={`additional-detail-${index}`} className="flex">
              <img src={iconUrl} />
              <p className="mb-1 text-label-primary">{name}</p>
            </div>
          ))
        : null}
      {isFormOpen ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="columns-2">
            <InputWithLabel
              register={register}
              errors={errors}
              name="name"
              placeholder={t('offer.name')}
              label={t('offer.name')}
            />
            <Controller
              name="iconUrl"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectWithLabel
                  value={value}
                  label={t('offer.icon')}
                  error={errors?.iconUrl}
                  options={CATEGORY_LIST}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <Button className="my-5 w-full" type="submit">
            Dodaj
          </Button>
        </form>
      ) : (
        <Button className="my-5" type="button" onClick={openForm}>
          Dodaj dodatkowe informacje
        </Button>
      )}
    </div>
  );
}

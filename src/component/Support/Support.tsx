import React from 'react';
import { Card } from '../ui/Card/Card';
import SupportForm from './SupportForm';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const { t } = useTranslation();
  return (
    <Card className="mx-auto w-[800px]">
      <SupportForm
        header={t('sidebar.support')}
        team={t('support.supportTeam')}
      />
    </Card>
  );
};

export default Support;

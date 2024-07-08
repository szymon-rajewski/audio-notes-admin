import React from 'react';
import { Card } from '../ui/Card/Card';
import SupportForm from './SupportForm';
import { useTranslation } from 'react-i18next';

const ContactSales = () => {
  const { t } = useTranslation();

  return (
    <Card className="mx-auto w-[800px]">
      <SupportForm
        header={t('support.contactSales')}
        team={t('support.salesTeam')}
      />
    </Card>
  );
};

export default ContactSales;

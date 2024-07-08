import CreateOfferForm from './CreateOfferForm';

export default interface CreateOfferRequest extends CreateOfferForm {
  userId: string;
  createdAt: string;
  updatedAt: string;
}

import {
  updateTitle,
  updateOverview,
  updateCountry,
  updateReleaseDate,
  updateGenre,
  updateIsConfirmPolitics,
  updateAdult,
  updateLogo,
  resetFormState,
  updateIsFormDisabled,
} from '../store/formSlice';

import { Genre } from '../interfaces';
import { useFormDispatch } from '../store';

const useFormReducer = () => {
  const dispatchForm = useFormDispatch();
  const setTitle = (title: string) => dispatchForm(updateTitle(title));
  const setOverview = (overview: string) => dispatchForm(updateOverview(overview));
  const setCountry = (country: string) => dispatchForm(updateCountry(country));
  const setReleaseDate = (date: string) => dispatchForm(updateReleaseDate(date));
  const setGenre = (genre: Genre) => dispatchForm(updateGenre(genre));
  const setIsConfirmPolitics = (isConfirmPolitics: boolean) =>
    dispatchForm(updateIsConfirmPolitics(isConfirmPolitics));
  const setAdult = (isAdult: boolean) => dispatchForm(updateAdult(isAdult));
  const setLogo = (logo: string | undefined) => dispatchForm(updateLogo(logo));
  const resetForm = () => dispatchForm(resetFormState());
  const updateFormDisabled = (isFormDisabled: boolean) =>
    dispatchForm(updateIsFormDisabled(isFormDisabled));

  return {
    setTitle,
    setOverview,
    setCountry,
    setReleaseDate,
    setGenre,
    setIsConfirmPolitics,
    setAdult,
    setLogo,
    resetForm,
    updateFormDisabled,
  };
};

export default useFormReducer;

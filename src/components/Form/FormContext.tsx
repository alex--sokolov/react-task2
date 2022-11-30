import React, { createContext, useReducer } from 'react';
import formReducer, {
  CHANGE_FORM_TITLE,
  CHANGE_FORM_OVERVIEW,
  CHANGE_FORM_COUNTRY,
  CHANGE_FORM_RELEASE_DATE,
  CHANGE_FORM_GENRE,
  CHANGE_FORM_IS_CONFIRM_POLITICS,
  CHANGE_FORM_ADULT,
  CHANGE_FORM_LOGO,
  CHANGE_IS_FORM_DISABLED,
  RESET_FORM,
} from './formReducer';

import { initialFormState } from './formReducer';
import { Genre, Props } from '../../interfaces';

export const FormContext = createContext(initialFormState);

const FormProvider = (props: Props) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const updateTitle = async (title: string) => {
    dispatch({
      type: CHANGE_FORM_TITLE,
      payload: title,
    });
  };

  const updateOverview = async (overview: string) => {
    dispatch({
      type: CHANGE_FORM_OVERVIEW,
      payload: overview,
    });
  };

  const updateCountry = async (country: string) => {
    dispatch({
      type: CHANGE_FORM_COUNTRY,
      payload: country,
    });
  };

  const updateReleaseDate = async (releaseDate: string) => {
    dispatch({
      type: CHANGE_FORM_RELEASE_DATE,
      payload: releaseDate,
    });
  };

  const updateGenre = async (genre: Genre) => {
    dispatch({
      type: CHANGE_FORM_GENRE,
      payload: genre,
    });
  };

  const updateIsConfirmPolitics = async (isConfirmPolitics: boolean) => {
    dispatch({
      type: CHANGE_FORM_IS_CONFIRM_POLITICS,
      payload: isConfirmPolitics,
    });
  };

  const updateAdult = async (adult: boolean) => {
    dispatch({
      type: CHANGE_FORM_ADULT,
      payload: adult,
    });
  };
  const updateLogo = async (logo: string | undefined) => {
    dispatch({
      type: CHANGE_FORM_LOGO,
      payload: logo,
    });
  };

  const resetForm = () => {
    dispatch({
      type: RESET_FORM,
    });
  };

  const updateIsFormDisabled = async (value: boolean) => {
    dispatch({
      type: CHANGE_IS_FORM_DISABLED,
      payload: value,
    });
  };

  const value = {
    title: state.title,
    overview: state.overview,
    country: state.country,
    releaseDate: state.releaseDate,
    genre: state.genre,
    isConfirmPolitics: state.isConfirmPolitics,
    adult: state.adult,
    logo: state.logo,
    isFormDisabled: state.isFormDisabled,
    updateTitle,
    updateOverview,
    updateCountry,
    updateReleaseDate,
    updateGenre,
    updateIsConfirmPolitics,
    updateAdult,
    updateLogo,
    resetForm,
    updateIsFormDisabled,
  };
  return <FormContext.Provider value={value}>{props.children}</FormContext.Provider>;
};

export default FormProvider;

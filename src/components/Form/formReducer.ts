import { Genre, IActionForms, IFormState } from '../../interfaces';

export const initialFormState: IFormState = {
  title: '',
  overview: '',
  country: '',
  releaseDate: '',
  genre: Genre.default,
  isConfirmPolitics: false,
  adult: false,
  logo: undefined,
  isFormDisabled: true,
};

export const CHANGE_FORM_TITLE = 'CHANGE_FORM_TITLE';
export const CHANGE_FORM_OVERVIEW = 'CHANGE_FORM_OVERVIEW';
export const CHANGE_FORM_COUNTRY = 'CHANGE_FORM_COUNTRY';
export const CHANGE_FORM_RELEASE_DATE = 'CHANGE_FORM_RELEASE_DATE';
export const CHANGE_FORM_GENRE = 'CHANGE_FORM_GENRE';
export const CHANGE_FORM_IS_CONFIRM_POLITICS = 'CHANGE_FORM_IS_sCONFIRM_POLITICS';
export const CHANGE_FORM_ADULT = 'CHANGE_FORM_ADULT';
export const CHANGE_FORM_LOGO = 'CHANGE_FORM_LOGO';
export const CHANGE_IS_FORM_DISABLED = 'CHANGE_IS_FORM_DISABLED';
export const RESET_FORM = 'RESET_FORM';

const formReducer = (state: IFormState, action: IActionForms): IFormState => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_FORM_TITLE:
      return {
        ...state,
        title: payload as string,
      };
    case CHANGE_FORM_OVERVIEW:
      return {
        ...state,
        overview: payload as string,
      };
    case CHANGE_FORM_COUNTRY:
      return {
        ...state,
        country: payload as string,
      };
    case CHANGE_FORM_RELEASE_DATE:
      return {
        ...state,
        releaseDate: payload as string,
      };
    case CHANGE_FORM_GENRE:
      return {
        ...state,
        genre: payload as Genre,
      };
    case CHANGE_FORM_IS_CONFIRM_POLITICS:
      return {
        ...state,
        isConfirmPolitics: !state.isConfirmPolitics,
      };
    case CHANGE_FORM_ADULT:
      return {
        ...state,
        adult: !state.adult,
      };
    case CHANGE_FORM_LOGO:
      return {
        ...state,
        logo: payload as string | undefined,
      };
    case RESET_FORM:
      console.log('initialFormState: ', initialFormState);

      return {
        ...initialFormState,
      };
    case CHANGE_IS_FORM_DISABLED:
      return {
        ...state,
        isFormDisabled: payload as boolean,
      };
    default:
      return state;
  }
};

export default formReducer;

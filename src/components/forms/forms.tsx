import React, { useEffect, useRef, useState } from 'react';
import { MultipleFieldErrors, useForm, Controller } from 'react-hook-form';
import './forms.scss';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { FormFields, Genre, IForm, NotifyType, NotifyMessage } from '../../interfaces';
import FormsCards from 'components/forms-cards/forms-cards';
import {
  isValidDate,
  isValidGenre,
  isValidMax,
  isValidMin,
  isValidOnlyEnglishSymbols,
} from '../../utils/validate';
import Spinner from 'components/spinner/spinner';
import { readFileAsDataURL } from '../../utils/readFileAsDataUrl';
import Notify from '../notify/notify';

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 30;
const OVERVIEW_MIN_LENGTH = 3;
const OVERVIEW_MAX_LENGTH = 100;
const COUNTRY_MIN_LENGTH = 3;
const COUNTRY_MAX_LENGTH = 20;
const MIN_DATE = '1997-01-01';
const MAX_DATE = '2030-12-31';

const initialFormValues: Omit<IForm, 'id'> = {
  title: '',
  overview: '',
  country: '',
  releaseDate: '',
  genre: Genre.default,
  isConfirmPolitics: false,
  adult: false,
  logo: undefined,
};

const Forms = () => {
  const [id, setId] = useState<number>(1);

  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitted },
  } = useForm({
    defaultValues: {
      id: id,
      ...initialFormValues,
    },
    criteriaMode: 'all',
  });

  const [cards, setCards] = useState<IForm[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: IForm) => {
    const newCard = {
      ...data,
      releaseDate: new Date(data.releaseDate).toLocaleString().slice(0, 10),
    };
    setCards([...cards, newCard]);
    setId(id + 1);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        reset({
          id: id,
          ...initialFormValues,
        });
      }, 2000);
    }
  }, [id, isSubmitSuccessful]);

  const showErrors = (errors: MultipleFieldErrors | undefined, isLogo = false) =>
    errors
      ? Object.entries(errors).map(([type, message]) =>
          type === 'required' && !isLogo ? '' : <div key={type}>{message}</div>
        )
      : '';

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<string | undefined> => {
    setIsLoading(true);
    const files = event.target.files as FileList;
    const imageFile = files[0] as Blob;
    const logo = await readFileAsDataURL(imageFile);
    setIsLoading(false);
    return logo ? logo.toString() : undefined;
  };
  const watchTitle = watch('title');
  const watchOverview = watch('overview');
  const watchCountry = watch('country');
  const watchReleaseDate = watch('releaseDate');
  const watchGenre = watch('genre');
  const watchIsConfirmPolitics = watch('isConfirmPolitics');
  const watchAdult = watch('adult');
  const watchLogo = watch('logo');

  useEffect(() => {
    if (fileInput && fileInput.current) {
      fileInput.current.value = '';
    }
  }, [watchLogo]);

  useEffect(() => {
    if (!isSubmitted && errors.logo) {
      clearErrors('logo');
      setValue('logo', undefined);
    }
  }, [
    isSubmitted,
    watchTitle,
    watchOverview,
    watchCountry,
    watchReleaseDate,
    watchGenre,
    watchIsConfirmPolitics,
    watchAdult,
  ]);

  return (
    <section className="forms">
      <Notify
        isShow={isSubmitSuccessful}
        message={NotifyMessage.MOVIE_ADDED}
        type={NotifyType.OK}
      />
      <form id="form-add-movie" className="form-add-movie" onSubmit={handleSubmit(onSubmit)}>
        <h1>Add new movie:</h1>
        <div className="field-errors">{showErrors(errors?.title?.types)}</div>
        <div className="form__field-row">
          <label>Title:</label>
          <input
            type="text"
            {...register(FormFields.title, {
              required: {
                value: true,
                message: `This is required`,
              },
              validate: {
                lessThan: (v) =>
                  isValidMax(v, TITLE_MAX_LENGTH) ||
                  `Must be less than ${TITLE_MAX_LENGTH} symbols`,
                moreThan: (v) =>
                  isValidMin(v, TITLE_MIN_LENGTH) ||
                  `Must be more than ${TITLE_MIN_LENGTH} symbols`,
              },
            })}
            className={errors.title ? 'error' : ''}
            data-testid="form-title"
          />
        </div>
        <div className="field-errors">{showErrors(errors?.overview?.types)}</div>
        <div className="form__field-row">
          <label>Overview:</label>
          <textarea
            {...register(FormFields.overview, {
              required: {
                value: true,
                message: `This is required`,
              },
              validate: {
                lessThan: (v) =>
                  isValidMax(v, OVERVIEW_MAX_LENGTH) ||
                  `Must be less than ${OVERVIEW_MAX_LENGTH} symbols`,
                moreThan: (v) =>
                  isValidMin(v, OVERVIEW_MIN_LENGTH) ||
                  `Must be more than ${OVERVIEW_MIN_LENGTH} symbols`,
              },
            })}
            className={errors.overview ? 'error' : ''}
            data-testid="form-overview"
          />
        </div>

        <div className="field-errors">{showErrors(errors?.country?.types)}</div>
        <div className="form__field-row">
          <label>Country:</label>
          <input
            type="text"
            {...register(FormFields.country, {
              required: {
                value: true,
                message: `This is required`,
              },
              validate: {
                lessThan: (v) =>
                  isValidMax(v, COUNTRY_MAX_LENGTH) ||
                  `Must be less than ${COUNTRY_MAX_LENGTH} symbols`,
                moreThan: (v) =>
                  isValidMin(v, COUNTRY_MIN_LENGTH) ||
                  `Must be more than ${COUNTRY_MIN_LENGTH} symbols`,
                onlyEnglish: (v) =>
                  isValidOnlyEnglishSymbols(v) || 'Must contain only english symbols',
              },
            })}
            className={errors.country ? 'error' : ''}
            data-testid="form-country"
          />
        </div>
        <div className="field-errors">{showErrors(errors?.releaseDate?.types)}</div>
        <div className="form__field-row">
          <label>Release date:</label>
          <Controller
            control={control}
            name="releaseDate"
            rules={{
              required: {
                value: true,
                message: `This is required`,
              },
              validate: {
                isValidDate: (v) =>
                  isValidDate(v, MIN_DATE, MAX_DATE) ||
                  `Must be between ${MIN_DATE} and ${MAX_DATE} date`,
              },
            }}
            render={({ field: { onChange, name, value } }) => (
              <>
                <DatePicker
                  value={value || ''}
                  onChange={(date) =>
                    onChange({ target: { name, value: (date as DateObject)?.toDate?.() } })
                  }
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  minDate={MIN_DATE}
                  maxDate={MAX_DATE}
                />
              </>
            )}
          />
        </div>
        <div className="field-errors">{showErrors(errors?.genre?.types)}</div>
        <div className="form__field-row">
          <label>Genre:</label>
          <select
            className={errors?.genre ? 'error' : ''}
            {...register(FormFields.genre, {
              required: {
                value: true,
                message: `This is required`,
              },
              validate: {
                isValidGenre: (v) => isValidGenre(v) || `Genre is not valid`,
              },
            })}
          >
            <option value="default" disabled>
              Choose an option
            </option>
            <option value={Genre.comedy}>{Genre.comedy}</option>
            <option value={Genre.horror}>{Genre.horror}</option>
            <option value={Genre.action}>{Genre.action}</option>
            <option value={Genre.crime}>{Genre.crime}</option>
            <option value={Genre.thriller}>{Genre.thriller}</option>
            <option value={Genre.drama}>{Genre.drama}</option>
          </select>
        </div>
        <div className="field-errors">{showErrors(errors?.isConfirmPolitics?.types)}</div>
        <div className="form__field-row policy">
          <div>
            <input
              type="checkbox"
              {...register(FormFields.isConfirmPolitics, {
                required: {
                  value: true,
                  message: `This is required`,
                },
                validate: {
                  mustBeConfirmed: (v) => !!v || 'Movie must be censored!',
                },
              })}
              id={FormFields.isConfirmPolitics}
              className={errors?.isConfirmPolitics ? 'error' : ''}
            />
          </div>
          <label htmlFor={FormFields.isConfirmPolitics}>This movie is censored</label>
        </div>
        <div className="switcher status">
          <div>Adult:</div>
          <div className="switch">
            <input
              type="checkbox"
              {...register(FormFields.adult)}
              id={FormFields.adult}
              name={FormFields.adult}
            />
            <label htmlFor={FormFields.adult} />
          </div>
        </div>
        <div className="field-errors">{showErrors(errors?.logo?.types, true)}</div>
        <div className="form__field-row file">
          <label>Load picture:</label>

          <Controller
            control={control}
            name="logo"
            rules={{
              required: {
                value: true,
                message: `Logo must be specified`,
              },
              validate: {
                mustBeImage: (v) => v !== 'not an image' || 'Must be an image',
              },
            }}
            render={({ field: { onChange, name, value } }) => (
              <>
                <input
                  type="file"
                  onChange={async (e) => {
                    const logo = await handleChangeImage(e);
                    onChange({ target: { name, value: logo } });
                    await trigger('logo');
                  }}
                  accept="image/*"
                  className={errors?.logo ? 'error' : ''}
                  style={{ display: 'none' }}
                  ref={fileInput}
                  data-testid="form-upload"
                />
                <div className="btn-add-file" onClick={() => fileInput.current?.click()}>
                  Pick file
                </div>
              </>
            )}
          />
        </div>
        <input
          type="submit"
          disabled={!isDirty || !!Object.keys(errors).length}
          data-testid="form-submit-btn"
        />
      </form>
      <div className="spinner" style={{ position: 'absolute' }}>
        <Spinner isLoading={isLoading} />
      </div>
      {cards.length ? <FormsCards cards={cards} /> : <></>}
    </section>
  );
};

export default Forms;

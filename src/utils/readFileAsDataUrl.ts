import { FieldError, FormFields } from '../interfaces';

export const readFileAsDataURL = async (file: Blob): Promise<string | FieldError | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e): void => {
      const result = e.target?.result;
      if ((result as string).indexOf('image') !== -1) {
        resolve(result as string);
      } else {
        resolve({
          field: FormFields.logo,
          errors: ['Must be an image'],
        });
      }
      resolve(null);
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};

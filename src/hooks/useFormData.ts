import { useContext } from 'react';
import { FormContext } from '../components/Form/FormContext';

const useFormData = () => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('useFormData must be used within FormContext');
  }

  return context;
};

export default useFormData;

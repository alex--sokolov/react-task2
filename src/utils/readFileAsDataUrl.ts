export const readFileAsDataURL = async (file: Blob): Promise<string | undefined | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e): void => {
      const result = e.target?.result;
      if ((result as string).indexOf('image') !== -1) {
        resolve(result as string);
      } else {
        resolve('not an image');
      }
      resolve(null);
    };
    reader.onerror = () => resolve(null);
    if (file instanceof Blob) {
      reader.readAsDataURL(file);
    }
  });
};

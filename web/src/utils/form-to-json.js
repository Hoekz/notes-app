import { setDeep } from './set-deep';

export function formToJSON(form) {
  const data = {};

  // convert the form element to form data and iterate over it to create an object
  for (const [key, value] of new FormData(form)) {
    setDeep(data, key, value);
  }

  return data;
}

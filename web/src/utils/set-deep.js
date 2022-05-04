export function setDeep(obj, path, value) {
  const [key, next, ...rest] = path.split(/\.|\[|\]/g).filter(Boolean);

  if (!next) {
    return obj[key] = value;
  }

  if (!(key in obj)) {
    if (/\D/.test(next)) {
      obj[key] = {};
    } else {
      obj[key] = [];
    }
  }

  return setDeep(obj[key], [next, ...rest].join('.'), value);
}

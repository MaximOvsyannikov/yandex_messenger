import Handlebars from 'handlebars';

export const registerHelpers = () => {
  Handlebars.registerHelper('eq', (a, b) => a === b);
  Handlebars.registerHelper('noteq', (a, b) => a !== b);
};

export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(object as Indexed, result);
}

export const addZeroToNumber = (data: string | number) => {
  if (+data < 10) return `0${data}`;
  return data;
};

export const formatDate = (data?: string) => {
  if (!data) return '';
  const date = new Date(data);
  if (date.getDay() === new Date().getDay())
    return `${addZeroToNumber(date.getHours())}:${addZeroToNumber(
      date.getMinutes()
    )}`;
  if (new Date().getTime() - date.getTime() < 24 * 3600 * 1000 * 7)
    return date.toLocaleString('default', { weekday: 'short' });
  return date.toLocaleDateString();
};

export const escape = (string: string) => {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return string.replace(/[&<>"']/g, function (match) {
    return htmlEscapes[match as keyof typeof htmlEscapes];
  });
};

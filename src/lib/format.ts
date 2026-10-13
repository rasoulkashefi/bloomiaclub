const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** Converts latin digits inside any value to Persian digits. */
export const toFa = (value: number | string): string =>
  String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

/** Converts Persian / Arabic-Indic digits to latin digits (for validation & storage). */
export const toLatinDigits = (value: string): string =>
  value
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

/** 4500000 -> ۴٬۵۰۰٬۰۰۰ */
export const formatNumber = (value: number): string =>
  toFa(Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬'));

/** 4500000 -> ۴٬۵۰۰٬۰۰۰ تومان */
export const formatToman = (value?: number | null): string | null =>
  value && value > 0 ? `${formatNumber(value)} تومان` : null;

/** 4.9 -> ۴٫۹ */
export const formatRating = (value: number): string =>
  toFa(value.toFixed(1)).replace('.', '٫');

/** First meaningful given-name for conversational copy. */
export const firstName = (fullName: string): string => fullName.trim().split(/\s+/)[0] ?? fullName;

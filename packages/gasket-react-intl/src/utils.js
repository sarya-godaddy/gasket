import { basePath, clientData, isBrowser, manifest } from './config';
import { LocaleUtils } from '@gasket/helper-intl';

export const localeUtils = new LocaleUtils({ manifest, basePath });

export { LocaleStatus } from '@gasket/helper-intl';

/**
 * Determines the active locale from either what was rendered for the page (preferred),
 * or what is set in navigator.languages for the browser.
 * @see: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/languages#Browser_compatibility
 *
 * @returns {Locale} locale
 */
export function getActiveLocale() {
  if (isBrowser) {
    return window.gasketIntlLocale ?? clientData.locale ?? navigator.languages[0];
  }
  return manifest.defaultLocale;
}

let localesParentDir;
export function getLocalesParentDir() {
  return localesParentDir || (
    // eslint-disable-next-line no-process-env
    localesParentDir = require('path').dirname(process.env.GASKET_INTL_LOCALES_DIR)
  );
}

import getUtilities from './_get';
import mapUtilities from './_map';
import errUtilities from './_err';

import processUtilities from './_process';

const utilities = {
  get: getUtilities,
  map: mapUtilities,
  err: errUtilities,
  process: processUtilities
}

export default utilities

export const get = getUtilities;
export const map = mapUtilities;
export const err = errUtilities;
export const process = processUtilities;
import getUtilities from './_get';
import mapUtilities from './_map';
import errUtilities from './_err';

import processUtilities from './_process';
import methodsUtilities from './_methods';

const utilities = {
  get: getUtilities,
  map: mapUtilities,
  err: errUtilities,
  process: processUtilities,
  methods: methodsUtilities
}

export default utilities

export const get = getUtilities;
export const map = mapUtilities;
export const err = errUtilities;
export const process = processUtilities;
export const methods = methodsUtilities;
/**
 * Created by Christian on 06.06.2015.
 */

import AuthErrorModule = require('./AuthError');
import InvalidResponseErrorModule = require('./InvalidResponseDataError');

export var AuthError = AuthErrorModule.AuthError;
export var InvalidResponseDataError = InvalidResponseErrorModule.InvalidResponseDataError;

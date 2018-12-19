import { Action } from '@ngrx/store';

import { CurrencyRates } from '../models/currencyRates';

export type State = CurrencyRates;

// ActionTypes
export const
    LOAD_CURRENCY_RATES = 'LOAD_CURRENCY_RATES';

export class LoadCurrencyRatesAction implements Action {
    readonly type = LOAD_CURRENCY_RATES;
    payload: CurrencyRates;
}

export type Actions = LoadCurrencyRatesAction;

// Reducers
export function rates(state: State = {}, action: Actions): State {
    switch (action.type) {

        case LOAD_CURRENCY_RATES:
            console.log(`LOAD_CURRENCY_RATES => ${JSON.stringify(action.payload)}`);
            return action.payload;

        default:
            return state;
    }
}

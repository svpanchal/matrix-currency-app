import { CurrencyRates } from './currencyRates';

export class CurrenciesResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: CurrencyRates;
}

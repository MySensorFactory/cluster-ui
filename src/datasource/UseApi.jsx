import {HomeApi} from './generated/src';

export function useApi() {
    const homeApi = new HomeApi();
    return { homeApi };
}
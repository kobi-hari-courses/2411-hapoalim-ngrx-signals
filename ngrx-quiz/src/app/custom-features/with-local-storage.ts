import { effect } from "@angular/core";
import { getState, patchState, signalStoreFeature, withHooks } from "@ngrx/signals";

export function withLocalStorage(key: string) {
    return signalStoreFeature(
        withHooks(store => ({
            onInit: () => {
                const serialized = localStorage.getItem(key);
                if (serialized) {
                    const state = JSON.parse(serialized);
                    patchState(store, state);
                }
        
                effect(() => {
                    const state = getState(store);
                    const serialized = JSON.stringify(state);
                    localStorage.setItem(key, serialized);
                });
            }
    }))
    );

}
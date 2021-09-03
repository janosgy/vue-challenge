import { createStore } from "vuex";

export type State = {
  priceComponents: PriceComponent[];
};

export type PriceComponent = {
  id: number;
  label: string;
  value: number;
  isProtected: boolean;
};

export type PriceComponentChange = {
  [k in keyof PriceComponent]: PriceComponent[k];
};

export default createStore<State>({
  state: {
    priceComponents: [
      {
        id: 0,
        label: "Baseprice",
        value: 1,
        isProtected: true,
      },
    ],
  },
  mutations: {
    ADD_PRICE_COMPONENT(
      state,
      { label, value }: { label: string; value: number }
    ) {
      state.priceComponents.push({
        id: Date.now(),
        isProtected: false,
        label,
        value,
      });
    },
    REMOVE_PRICE_COMPONENT(state: State, { id }: { id: number }) {
      state.priceComponents = state.priceComponents.filter(
        (priceComponent) =>
          priceComponent.id !== id || priceComponent.isProtected
      );
    },
    UPDATE_PRICE_COMPONENT(
      state: State,
      {
        id,
        changes,
      }: {
        id: number;
        changes: PriceComponentChange;
      }
    ) {
      state.priceComponents = state.priceComponents.map((priceComponent) => {
        if (priceComponent.id === id) {
          return {
            ...priceComponent,
            ...changes,
          };
        }
        return priceComponent;
      });
    },
  },
  getters: {
    totalCost(state): number {
      return state.priceComponents.reduce(
        (acc, priceComponent) => acc + priceComponent.value,
        0
      );
    },
  },
  actions: {},
  modules: {},
});

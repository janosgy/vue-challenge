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
    REMOVE_PRICE_COMPONENT(state, { id }: { id: number }) {
      state.priceComponents = state.priceComponents.filter(
        (priceComponent) =>
          priceComponent.id !== id || priceComponent.isProtected
      );
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

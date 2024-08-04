import types from "./types";

const initialState = {
  optionsTarget: [
    {
      label: "Tidak ada link",
      options: [{ value: "noLink", label: "Tidak ada link" }],
    },
    {
      label: "Web",
      options: [
        { value: "url", label: "URL" },
        { value: "scroll-target", label: "Scroll Target" },
      ],
    },
    {
      label: "Chat",
      options: [{ value: "whatApps", label: "Whatapps" }],
    },
  ],
  optionsScrollTarget: [
    { id: "hakdjw", value: "back-to-top", label: "Kembali Ke Atas" },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_OPTIONS_SCROLL_TARGET:
      const isExisting = state.optionsScrollTarget.some(
        (option) => option.id === action.payload.id
      );

      const updatedOptions = isExisting
        ? state.optionsScrollTarget.map((option) =>
            option.id === action.payload.id ? action.payload : option
          )
        : [...state.optionsScrollTarget, action.payload];

      return {
        ...state,
        optionsScrollTarget: updatedOptions,
      };
    case types.REMOVE_OPTIONS_SCROLL_TARGET:
      return {
        ...state,
        optionsScrollTarget: state.optionsScrollTarget.filter(
          (option) => option.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const setOptionsScrollTarget = (payload) => ({
  type: types.SET_OPTIONS_SCROLL_TARGET,
  payload,
});
export const removeOptionScrollTarget = (id) => ({
  type: types.REMOVE_OPTIONS_SCROLL_TARGET,
  payload: id,
});

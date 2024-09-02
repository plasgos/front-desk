import types from "./types";

const initialState = {
  landingPageSection: [],
  optionsTarget: [
    {
      label: "Tidak ada link",
      options: [{ value: undefined, label: "Tidak ada link" }],
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
  optionsFbPixelId: [
    { id: "fb-id-1", value: "randomId123", label: "Old Habassy" },
  ],
  optionsFbPixelEvent: [
    {
      label: "Utama",
      options: [
        { value: undefined, label: "Tidak Ada" },
        { value: "custom", label: "Custom" },
      ],
    },
    {
      label: "Belanja",
      options: [
        { value: "add-payment-info", label: "Add Payment Info" },
        { value: "add-to-cart", label: "Add to Cart" },
        { value: "add-to-wishlist", label: "Add to Wishlist" },
        { value: "initiate-checkout", label: "Initiate Checkout" },
        { value: "purchase", label: "Purchase" },
        { value: "search", label: "Search" },
        { value: "view-content", label: "View Content" },
      ],
    },
    {
      label: "Leads",
      options: [
        { value: "lead", label: "Lead" },
        { value: "page-view", label: "Page View" },
        { value: "complete-registration", label: "Complete Registration" },
        { value: "contact", label: "Contact" },
        { value: "find-location", label: "Find Location" },
      ],
    },
    {
      label: "Subscription",
      options: [
        { value: "start-trial", label: "Start Trial" },
        { value: "subscribe", label: "Subscribe" },
      ],
    },
    {
      label: "Lainnya",
      options: [
        { value: "customize-product", label: "Customize Product" },
        { value: "donate", label: "Donate" },
        { value: "schedule", label: "Schedule" },
        { value: "submit-application", label: "Submit Application" },
      ],
    },
  ],
  isSelectVariantMultiSelect: false,
  isSelectVariantSelectOption: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANDING_PAGE_SECTION:
      return {
        ...state,
        landingPageSection: action.payload,
      };
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
    case types.IS_SELECT_VARIANT_MULTISELECT:
      return {
        ...state,
        isSelectVariantMultiSelect: action.payload,
      };
    case types.IS_SELECT_VARIANT_SELECT_OPTION:
      return {
        ...state,
        isSelectVariantSelectOption: action.payload,
      };

    default:
      return state;
  }
};

export const setLandingPageSection = (payload) => ({
  type: types.SET_LANDING_PAGE_SECTION,
  payload,
});
export const setOptionsScrollTarget = (payload) => ({
  type: types.SET_OPTIONS_SCROLL_TARGET,
  payload,
});
export const removeOptionScrollTarget = (id) => ({
  type: types.REMOVE_OPTIONS_SCROLL_TARGET,
  payload: id,
});

export const setIsSelectVariantMultiSelect = (isMultiSelect) => ({
  type: types.IS_SELECT_VARIANT_MULTISELECT,
  payload: isMultiSelect,
});

export const setIsSelectVariantSelectOption = (isSelectOption) => ({
  type: types.IS_SELECT_VARIANT_SELECT_OPTION,
  payload: isSelectOption,
});

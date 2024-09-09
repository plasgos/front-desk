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
  selectedVariant: null,
  currentVariantMultiSelect: {},
  optionsGroups: [],
  options: [],
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
    case types.CURRRENT_VARIANT_MULTISELECT:
      return {
        ...state,
        currentVariantMultiSelect: action.payload,
      };
    case types.SET_SELECTED_VARIANT:
      return {
        ...state,
        selectedVariant: action.payload,
      };

    case types.ADD_OPTIONS_GROUPS:
      return {
        ...state,
        optionsGroups: [...state.optionsGroups, action.payload],
      };

    case types.ADD_OPTION:
      return {
        ...state,
        options: [...state.options, action.payload],
      };

    case types.UPDATE_OPTIONS_GROUPS:
      return {
        ...state,
        optionsGroups: state.optionsGroups.map((group) =>
          group.groupId === action.payload.groupId
            ? {
                ...group,
                label: action.payload.value,
              }
            : group
        ),
      };

    case types.UPDATE_OPTION:
      return {
        ...state,
        options: state.options.map((opt) =>
          opt.id === action.payload.optionId
            ? {
                ...opt,
                label: action.payload.value,
                value: `${action.payload.optionId}-${action.payload.value}`,
              }
            : opt
        ),
      };

    case types.DELETE_OPTIONS_GROUPS:
      return {
        ...state,
        optionsGroups: state.optionsGroups.filter(
          (option) => option.groupId !== action.payload.groupId
        ),
      };

    case types.DELETE_OPTION:
      return {
        ...state,
        options: state.options.filter(
          (option) => option.id !== action.payload.optionId
        ),
      };

    case types.SORT_GROUPS: {
      const { dragIndex, hoverIndex } = action.payload;

      // Copy dari optionsGroups agar tidak mutasi langsung
      const updatedGroups = [...state.optionsGroups];

      // Ambil item yang sedang di-drag
      const draggedGroup = updatedGroups[dragIndex];

      // Hapus item yang sedang di-drag dari array
      updatedGroups.splice(dragIndex, 1);

      // Sisipkan item di posisi baru (hoverIndex)
      updatedGroups.splice(hoverIndex, 0, draggedGroup);

      return {
        ...state,
        optionsGroups: updatedGroups,
      };
    }

    case types.SORT_OPTION: {
      const { dragIndex, hoverIndex } = action.payload;

      // Copy dari optionsGroups agar tidak mutasi langsung
      const updatedGroups = [...state.options];

      // Ambil item yang sedang di-drag
      const draggedGroup = updatedGroups[dragIndex];

      // Hapus item yang sedang di-drag dari array
      updatedGroups.splice(dragIndex, 1);

      // Sisipkan item di posisi baru (hoverIndex)
      updatedGroups.splice(hoverIndex, 0, draggedGroup);

      return {
        ...state,
        options: updatedGroups,
      };
    }

    case types.ADD_OPTIONS_OPSI_GROUPS:
      return {
        ...state,
        optionsGroups: state.optionsGroups.map((group) =>
          group.groupId === action.payload.groupId
            ? {
                ...group,
                options: [...group.options, action.payload.newOption],
              }
            : group
        ),
      };

    case types.UPDATE_OPTIONS_OPSI_GROUPS:
      return {
        ...state,
        optionsGroups: state.optionsGroups.map((group) =>
          group.groupId === action.payload.groupId
            ? {
                ...group,
                options: group.options.map((opt) =>
                  opt.id === action.payload.optionId
                    ? {
                        ...opt,
                        label: action.payload.value,
                        value: `${action.payload.groupId}-${action.payload.value}`,
                      }
                    : opt
                ),
              }
            : group
        ),
      };

    case types.DELETE_OPTIONS_OPSI_GROUPS:
      return {
        ...state,
        optionsGroups: state.optionsGroups.map((group) =>
          group.groupId === action.payload.groupId
            ? {
                ...group,
                options: group.options.filter(
                  (opt) => opt.id !== action.payload.optionId
                ),
              }
            : group
        ),
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

export const setCurrentVariantMultiSelect = (option) => ({
  type: types.CURRRENT_VARIANT_MULTISELECT,
  payload: option,
});
export const setSelectedVariant = (variant) => ({
  type: types.SET_SELECTED_VARIANT,
  payload: variant,
});

export const addOptionsGroup = (newOptionGroup) => {
  return {
    type: types.ADD_OPTIONS_GROUPS,
    payload: newOptionGroup,
  };
};

export const updateOptionsGroup = (groupId, value) => {
  return {
    type: types.UPDATE_OPTIONS_GROUPS,
    payload: {
      groupId,
      value,
    },
  };
};

export const deleteOptionsGroup = (groupId) => {
  return {
    type: types.DELETE_OPTIONS_GROUPS,
    payload: {
      groupId,
    },
  };
};

export const sortOptionsGroups = (dragIndex, hoverIndex) => {
  return {
    type: types.SORT_GROUPS,
    payload: {
      dragIndex,
      hoverIndex,
    },
  };
};

export const addOptionOpsiGroup = (groupId, newOption) => {
  return {
    type: types.ADD_OPTIONS_OPSI_GROUPS,
    payload: {
      groupId,
      newOption,
    },
  };
};

export const updateOptionsOpsiGroup = (groupId, optionId, value) => {
  return {
    type: types.UPDATE_OPTIONS_OPSI_GROUPS,
    payload: {
      groupId,
      optionId,
      value,
    },
  };
};

export const deleteOptionsOpsiGroup = (groupId, optionId) => {
  return {
    type: types.DELETE_OPTIONS_OPSI_GROUPS,
    payload: {
      groupId,
      optionId,
    },
  };
};

export const addOption = (option) => {
  return {
    type: types.ADD_OPTION,
    payload: option,
  };
};

export const updateOption = (optionId, value) => {
  return {
    type: types.UPDATE_OPTION,
    payload: {
      optionId,
      value,
    },
  };
};

export const deleteOption = (optionId) => {
  return {
    type: types.DELETE_OPTION,
    payload: {
      optionId,
    },
  };
};

export const sortOption = (dragIndex, hoverIndex) => {
  return {
    type: types.SORT_OPTION,
    payload: {
      dragIndex,
      hoverIndex,
    },
  };
};

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
        { value: "local-page", label: "Halaman Lokal" },
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
  isAddCouriers: false,
  isEditingCouriers: false,
  selectedCourier: {},
  currentCourierBeforeEdit: [],
  multiColumnSection: {
    isAddColumn: false,
    isEditingColumn: false,
    isAddColumnSection: false,
    isEditingColumnSection: false,
    isEditingSection: false,
  },
  popup: [],
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

      console.log("🚀 ~ updatedOptions:", updatedOptions);

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
          opt.id === action.payload?.optionId
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

    case types.SET_ADD_COURIERS:
      return {
        ...state,
        isAddCouriers: action.payload,
      };

    case types.SET_EDIT_COURIERS:
      return {
        ...state,
        isEditingCouriers: action.payload,
      };

    case types.SET_SELECT_COURIER:
      return {
        ...state,
        selectedCourier: action.payload,
      };

    case types.SET_CURRENT_COURIER_BEFORE_EDIT:
      return {
        ...state,
        currentCourierBeforeEdit: action.payload,
      };

    case types.SET_IS_ADD_COLUMN:
      return {
        ...state,
        multiColumnSection: {
          ...state.multiColumnSection,
          isAddColumn: action.payload,
        },
      };

    case types.SET_IS_EDITING_COLUMN:
      return {
        ...state,
        multiColumnSection: {
          ...state.multiColumnSection,
          isEditingColumn: action.payload,
        },
      };

    case types.SET_IS_ADD_COLUMN_SECTION:
      return {
        ...state,
        multiColumnSection: {
          ...state.multiColumnSection,
          isAddColumnSection: action.payload,
        },
      };

    case types.SET_IS_EDITING_COLUMN_SECTION:
      return {
        ...state,
        multiColumnSection: {
          ...state.multiColumnSection,
          isEditingColumnSection: action.payload,
        },
      };

    case types.SET_IS_EDITING_SECTION:
      return {
        ...state,
        multiColumnSection: {
          ...state.multiColumnSection,
          isEditingSection: action.payload,
        },
      };

    // case types.SET_POP_UP_CLICK_OPTION:
    //   const updatedOptionsPopUp = (() => {
    //     // Cek apakah grup "Kegiatan" sudah ada
    //     const existingGroup = state.optionsTarget.find(
    //       (group) => group.label === "Kegiatan"
    //     );

    //     if (existingGroup) {
    //       // Jika grup "Kegiatan" sudah ada
    //       return state.optionsTarget.map((group) => {
    //         if (group.label === "Kegiatan") {
    //           // Buat array baru untuk opsi yang diperbarui
    //           const updatedOptions = group.options.map((option) => {
    //             // Cek apakah ada opsi baru dengan ID yang sama
    //             const newOption = action.payload.options.find(
    //               (opt) => opt.id === option.id
    //             );

    //             // Jika opsi baru ditemukan, kembalikan opsi baru, jika tidak, kembalikan opsi yang lama
    //             return newOption ? newOption : option;
    //           });

    //           // Tambahkan opsi baru yang belum ada
    //           const newOptions = action.payload.options.filter(
    //             (newOpt) => !group.options.some((opt) => opt.id === newOpt.id)
    //           );

    //           // Gabungkan opsi yang diperbarui dengan opsi baru
    //           return {
    //             ...group,
    //             options: [...updatedOptions, ...newOptions],
    //           };
    //         }

    //         // Kembalikan grup lain tanpa perubahan
    //         return group;
    //       });
    //     } else {
    //       // Jika grup "Kegiatan" belum ada, tambahkan grup baru
    //       return [
    //         ...state.optionsTarget,
    //         {
    //           label: action.payload.label,
    //           options: action.payload.options,
    //         },
    //       ];
    //     }
    //   })();

    //   console.log("🚀 ~ updatedOptionsPopUp:", updatedOptionsPopUp);

    //   return {
    //     ...state,
    //     optionsTarget: updatedOptionsPopUp,
    //   };

    case types.SET_POP_UP_CLICK_OPTION:
      const updatedOptionsPopUp = (() => {
        // Cari grup "Kegiatan" di dalam state.optionsTarget
        const existingGroup = state.optionsTarget.find(
          (group) => group.label === "Kegiatan"
        );

        if (existingGroup) {
          // Jika grup "Kegiatan" sudah ada
          return state.optionsTarget.map((group) => {
            if (group.label === "Kegiatan") {
              // Perbarui opsi yang ada dalam grup "Kegiatan"
              const updatedOptions = group.options.map((option) => {
                // Cari opsi baru dengan ID yang sama
                const newOption = action.payload.options.find(
                  (opt) => opt.id === option.id
                );

                // Jika ditemukan opsi baru, gunakan opsi baru, jika tidak, gunakan opsi lama
                return newOption ? newOption : option;
              });

              // Filter opsi baru yang belum ada di grup "Kegiatan"
              const newOptions = action.payload.options.filter(
                (newOpt) => !group.options.some((opt) => opt.id === newOpt.id)
              );

              // Gabungkan opsi baru di bagian atas dengan opsi yang sudah diperbarui
              return {
                ...group,
                options: [...updatedOptions, ...newOptions], // newOptions di bagian atas
              };
            }

            // Kembalikan grup lain tanpa perubahan
            return group;
          });
        } else {
          // Jika grup "Kegiatan" belum ada, tambahkan grup baru
          return [
            {
              label: action.payload.label,
              options: action.payload.options,
            },
            ...state.optionsTarget,
          ];
        }
      })();

      return {
        ...state,
        optionsTarget: updatedOptionsPopUp,
      };

    case types.SET_IS_OPEN_POP_UP:
      const isExistingPopUp = state.popup.some(
        (option) => option.id === action.payload.id
      );

      const updatedOptionsPopUpShown = isExistingPopUp
        ? state.popup.map((option) =>
            option.id === action.payload.id ? action.payload : option
          )
        : [...state.popup, action.payload];

      return {
        ...state,
        popup: updatedOptionsPopUpShown,
      };

    case types.SET_CLOSE_POP_UP:
      const updatePopupValue = state.popup.map((arr) =>
        arr.id === action.payload?.id
          ? {
              ...arr,
              isShowPopup: false,
            }
          : arr
      );

      return {
        ...state,
        popup: updatePopupValue,
      };

    case types.REMOVE_POP_UP_OPTION_SHOWN:
      return {
        ...state,
        popup: state.popup.filter((opt) => opt.id !== action.payload),
      };

    case types.REMOVE_POP_UP_OPTION:
      const { optionsTarget } = state;

      const existingGroup = optionsTarget.find(
        (group) => group.label === "Kegiatan"
      );

      const updatedOptionsTarget = optionsTarget.map((group) =>
        group.label === "Kegiatan"
          ? {
              ...group,
              options: group.options.filter((opt) => opt.id !== action.payload),
            }
          : group
      );

      return {
        ...state,
        optionsTarget: existingGroup ? updatedOptionsTarget : optionsTarget,
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

export const setIsAddCouriers = (value) => {
  return {
    type: types.SET_ADD_COURIERS,
    payload: value,
  };
};

export const setIsEditCouriers = (value) => {
  return {
    type: types.SET_EDIT_COURIERS,
    payload: value,
  };
};

export const setSelectCourier = (value) => {
  return {
    type: types.SET_SELECT_COURIER,
    payload: value,
  };
};

export const setCurrentCourierBeforeEdit = (value) => {
  return {
    type: types.SET_CURRENT_COURIER_BEFORE_EDIT,
    payload: value,
  };
};

export const setIsAddColumn = (value) => {
  return {
    type: types.SET_IS_ADD_COLUMN,
    payload: value,
  };
};

export const setIsEditingColumn = (value) => {
  return {
    type: types.SET_IS_EDITING_COLUMN,
    payload: value,
  };
};

export const setIsAddColumnSection = (value) => {
  return {
    type: types.SET_IS_ADD_COLUMN_SECTION,
    payload: value,
  };
};

export const setIsEditingColumnSection = (value) => {
  return {
    type: types.SET_IS_EDITING_COLUMN_SECTION,
    payload: value,
  };
};

export const setIsEditingSection = (value) => {
  return {
    type: types.SET_IS_EDITING_SECTION,
    payload: value,
  };
};

export const setPopUpClickOption = (value) => {
  return {
    type: types.SET_POP_UP_CLICK_OPTION,
    payload: value,
  };
};

export const setIsOpenPopup = (value) => {
  return {
    type: types.SET_IS_OPEN_POP_UP,
    payload: value,
  };
};

export const setClosePopup = (value) => {
  return {
    type: types.SET_CLOSE_POP_UP,
    payload: value,
  };
};

export const removePopupOption = (value) => {
  return {
    type: types.REMOVE_POP_UP_OPTION,
    payload: value,
  };
};

export const removePopupOptionShown = (value) => {
  return {
    type: types.REMOVE_POP_UP_OPTION_SHOWN,
    payload: value,
  };
};

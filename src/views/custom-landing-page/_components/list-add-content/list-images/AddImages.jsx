import { CButton, CCard, CTooltip } from "@coreui/react";
import React, { useEffect, useState } from "react";
import image from "../../../../../assets/action-figure.jpg";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";
import { createUniqueID } from "../../../../../lib/unique-id";
import Select from "react-select";
import { FaCircleInfo } from "react-icons/fa6";
import { optionsScrollTarget, optionsTarget } from "../../options-select";

export const AddImages = ({
  idSection,
  sections,
  defaultSection,
  setPreviewSection,
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [alt, setAlt] = useState("");
  const [whatApps, setWhatApps] = useState({});
  const [url, setUrl] = useState({});
  const [scrollTarget, setScrollTarget] = useState({});
  const [setting, setSetting] = useState({});
  const [selectedOption, setSelectedOption] = useState(undefined);

  const [selectedOptionScrollTarget, setSelectedOptionScrollTarget] =
    useState(undefined);

  const [updatedOptionsScrollTarget, setUpdatedOptionsScrollTarget] =
    useState(optionsScrollTarget);
  const handleChangeScrollTarget = (selectedOption) => {
    setSelectedOptionScrollTarget(selectedOption);

    resetUrlValue();
    resetWhatAppsValue();

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
                        url,
                        scrollTarget: {
                          target: selectedOption.value,
                          label: selectedOption.label,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (selectedOption && selectedOption.value === "scroll-target") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(setting.id)
                    ? {
                        ...contentItem,
                        target: {
                          ...contentItem.target,
                          whatApps,
                          url,
                          scrollTarget: {
                            ...contentItem.target.scrollTarget,
                            target: "back-to-top",
                            label: "Kembali Ke Atas",
                          },
                        },
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (sections) {
      const filteredScrolltarget = sections
        .filter((section) => section.name === "scroll-target")
        .reduce((acc, item) => {
          acc = {
            value: item.content.name,
            label: item.content.name,
          };
          return acc;
        }, {});

      setUpdatedOptionsScrollTarget((prev) => [...prev, filteredScrolltarget]);
    }
  }, [sections]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        image: imageUrl,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleAltChange = (value) => {
    setAlt(value);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        alt: value,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const resetWhatAppsValue = () => {
    setWhatApps({
      phoneNumber: "",
      message: "",
      isOpenNewTab: false,
    });
  };

  const resetUrlValue = () => {
    setUrl({
      url: "",
      isOpenNewTab: false,
    });
  };

  const resetScrolltargetValue = () => {
    setScrollTarget({
      value: "",
      label: "",
    });
  };

  const handleUrlChange = (value) => {
    resetWhatAppsValue();
    resetScrolltargetValue();
    setUrl((prevValue) => ({
      ...prevValue,
      url: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
                        scrollTarget,
                        url: {
                          ...contentItem.target.url,
                          url: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleUrlOpenNewTabChange = (value) => {
    resetWhatAppsValue();
    resetScrolltargetValue();
    setUrl((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
                        scrollTarget,
                        url: {
                          ...contentItem.target.url,
                          isOpenNewTab: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handlePhoneNumberChange = (value) => {
    resetUrlValue();
    resetScrolltargetValue();
    setWhatApps((prevValue) => ({
      ...prevValue,
      phoneNumber: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
                        scrollTarget,
                        whatApps: {
                          ...contentItem.target.whatApps,
                          phoneNumber: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleMessageChange = (value) => {
    resetUrlValue();
    resetScrolltargetValue();
    setWhatApps((prevValue) => ({
      ...prevValue,
      message: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
                        scrollTarget,
                        whatApps: {
                          ...contentItem.target.whatApps,
                          message: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleUrlOpenNewTabWaChange = (value) => {
    resetUrlValue();
    resetScrolltargetValue();
    setWhatApps((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(setting.id)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
                        scrollTarget,
                        whatApps: {
                          ...contentItem.target.whatApps,
                          isOpenNewTab: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(defaultSection);
    let payload = {
      id: uniqueId,
      content: {
        image: imageUrl,
        alt,
      },
      target: {
        url: {
          url: "",
          isOpenNewTab: false,
        },
        whatApps: {
          phoneNumber: "",
          message: "",
          isOpenNewTab: false,
        },
        scrollTarget: {
          target: "",
          label: "",
        },
      },
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === idSection
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );

    setSetting(payload);
  };

  useEffect(() => {
    handleAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customStyles = {
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: "bold",
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "text",
    }),
  };

  return (
    <CCard
      style={{
        borderRadius: 0,
        border: 0,
      }}
    >
      <div style={{ zIndex: 1 }} className="w-100">
        <div className="mb-2">
          <div
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              overflow: "hidden",
            }}
            className="mx-auto mb-2"
          >
            <img
              style={{ objectFit: "contain", width: "100%", height: 100 }}
              src={imageUrl || image}
              alt="img"
            />
          </div>

          <CButton
            onClick={handleFileUpload}
            color="primary"
            variant="outline"
            className="btn-block"
          >
            Upload
          </CButton>
        </div>

        <form>
          <div className="form-group">
            <label>Alt</label>
            <input
              value={alt}
              onChange={(event) => handleAltChange(event.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group ">
            <label>Target</label>
            <Select
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#FED4C6",
                  // Set the color when focused
                },
              })}
              classNames={{
                control: (state) =>
                  state.isFocused ? "rounded  border-primary" : "rounded",
              }}
              options={optionsTarget}
              styles={customStyles}
              onChange={handleChange}
              isSearchable={false}
              value={selectedOption}
              defaultValue={{
                value: "noLink",
                label: "Tidak ada link",
              }}
            />
          </div>

          {selectedOption?.value === "url" && (
            <div className="form-group">
              <label>URL</label>
              <input
                value={url.url}
                onChange={(event) => handleUrlChange(event.target.value)}
                type="text"
                className="form-control"
              />

              <div className="d-flex align-items-center my-1">
                <input
                  checked={url.isOpenNewTab}
                  onChange={(event) =>
                    handleUrlOpenNewTabChange(event.target.checked)
                  }
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                />
                <div className="ml-1">Buka di tab baru</div>
              </div>
            </div>
          )}

          {selectedOption?.value === "whatApps" && (
            <>
              <div className="form-group">
                <div className="d-flex align-items-center mb-2">
                  <label className="p-0 m-0">Nomor Telepon</label>
                  <CTooltip content="Aka langsung membuka aplikasi Whatapps untuk memulai percakapan dengan nomor tertera ">
                    <FaCircleInfo style={{ marginLeft: 4 }} size={12} />
                  </CTooltip>
                </div>

                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      +62
                    </span>
                    <input
                      style={{ borderRadius: "0px 0.5rem 0.5rem 0px" }}
                      aria-describedby="basic-addon1"
                      placeholder="8114002323"
                      value={whatApps.phoneNumber}
                      onChange={(event) =>
                        handlePhoneNumberChange(event.target.value)
                      }
                      type="number"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Pesan (Opsional)</label>
                <input
                  placeholder="Tuliskan pesan kamu di sini"
                  value={whatApps.message}
                  onChange={(event) => handleMessageChange(event.target.value)}
                  type="text"
                  className="form-control"
                />
                <div className="d-flex align-items-center my-1">
                  <input
                    checked={whatApps.isOpenNewTab}
                    onChange={(event) =>
                      handleUrlOpenNewTabWaChange(event.target.checked)
                    }
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                  />
                  <div className="ml-1">Buka di tab baru</div>
                </div>
              </div>
            </>
          )}

          {selectedOption?.value === "scroll-target" && (
            <div className="form-group ">
              <div className="d-flex align-items-center mb-2">
                <label className="p-0 m-0">Target</label>
                <CTooltip
                  content={`Untuk menggunakan tipe link ini, mohon tambahkan seksi "Scroll Target di halaman ini" `}
                >
                  <FaCircleInfo style={{ marginLeft: 4 }} size={12} />
                </CTooltip>
              </div>
              <Select
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#FED4C6",
                    // Set the color when focused
                  },
                })}
                classNames={{
                  control: (state) =>
                    state.isFocused ? "rounded  border-primary" : "rounded",
                }}
                options={updatedOptionsScrollTarget}
                styles={customStyles}
                onChange={handleChangeScrollTarget}
                isSearchable={false}
                value={selectedOptionScrollTarget}
                defaultValue={updatedOptionsScrollTarget[0]}
              />
            </div>
          )}
        </form>
      </div>
    </CCard>
  );
};

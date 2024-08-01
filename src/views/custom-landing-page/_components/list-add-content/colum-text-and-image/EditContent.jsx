import { CButton, CCard, CTooltip } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-slideshow-image/dist/styles.css";
import { options } from "../list-images/AddImages";
import { customStyles } from "../list-images/ListImagesContro;";
import Select from "react-select";

export const EditContent = ({
  idSection,
  idContent,
  titleValue,
  target,
  descriptionValue,
  image,
  setPreviewSection,
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [title, setTitle] = useState(titleValue);
  const [description, setDescription] = useState(descriptionValue);
  const [url, setUrl] = useState(target?.url);
  const [whatApps, setWhatApps] = useState(target?.whatApps);
  const [selectedOption, setSelectedOption] = useState(undefined);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    if (url?.url) {
      setSelectedOption({ value: "url", label: "URL" });
    }
  }, [url]);

  useEffect(() => {
    if (whatApps?.phoneNumber) {
      setSelectedOption({ value: "whatApps", label: "Whatapps" });
    }
  }, [whatApps]);

  useEffect(() => {
    const resetTarget = {
      url: {
        url: "",
        isOpenNewTab: false,
      },
      whatApps: {
        phoneNumber: "",
        message: "",
        isOpenNewTab: false,
      },
    };

    if (selectedOption?.value === "noLink") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === String(idContent)
                    ? {
                        ...contentItem,
                        target: resetTarget,
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

  // Efek ini akan dipanggil setiap kali imageUrl berubah
  useEffect(() => {
    // Update tempSections setelah imageUrl berubah
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
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

  const handleEditorChange = (value) => {
    setDescription(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        description: description,
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleTitleChange = (value) => {
    setTitle(value);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        title: value,
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

  const handleUrlChange = (value) => {
    resetWhatAppsValue();
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
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
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
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        whatApps,
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
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
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
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
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
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
                        url,
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
              options={options}
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
          <div className="form-group">
            <label>Judul</label>
            <input
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              type="text"
              className="form-control"
            />
          </div>
        </form>

        <ReactQuill
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              ["image"],
              ["link"],
              ["clean"],
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: true,
            },
          }}
          formats={[
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "image",
            "link",
            "clean",
          ]}
          theme="snow"
          value={description}
          onChange={handleEditorChange}
          className="text-editor rounded"
        />
      </div>
    </CCard>
  );
};

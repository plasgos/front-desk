import React, { useEffect, useRef, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import ColorPicker from "../../common/ColorPicker";
import { shadowOptions } from "../../SelectOptions";
import FacebookPixel from "../../FacebookPixel";
import { formatPrice } from "../../../../../lib/format-price";
import { CTooltip } from "@coreui/react";
import { FaCircleInfo } from "react-icons/fa6";

const positionOptions = [
  { value: "top-left", label: "Atas Kiri" },
  { value: "top-right", label: "Atas Kanan" },
  { value: "bottom-left", label: "Bawah Kiri" },
  { value: "bottom-right", label: "Bawah Kanan" },
];

const imageSizeOptions = [
  { value: "57px", label: "Lebih Kecil" },
  { value: "74px", label: "Kecil" },
  { value: "88px", label: "Normal" },
  { value: "104px", label: "Besar" },
  { value: "124px", label: "Lebih Besar" },
];

const roundedOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "tw-rounded", label: "Kecil" },
  { value: "tw-rounded-md", label: "Sedang" },
  { value: "tw-rounded-lg", label: "Besar" },
];

const isShowOptions = [
  { value: false, label: "Tersembunyi" },
  { value: true, label: "Perlihatkan" },
];

const linkToOptions = [
  { value: "product-detail", label: "Detail Produk" },
  { value: undefined, label: "Tidak Ada" },
];

const UpdateDesign = ({ setPreviewSection, currentSection }) => {
  const [template, setTemplate] = useState(
    currentSection?.currentTemplate ||
      "{{ name }} di {{ location }} baru saja membeli produk ini"
  );
  const [messages, setMessages] = useState([]);
  // Fungsi untuk mengganti semua placeholder dengan data yang relevan
  const generateMessage = (template, data) => {
    return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
      if (key === "price") {
        return formatPrice(data[key] || 0); // Format jika placeholder "price"
      }
      return data[key] || ""; // Kembalikan nilai lain seperti biasa
    });
  };

  useEffect(() => {
    if (!currentSection) return; // Cek agar tidak dijalankan saat currentSection belum ada

    const newMessages = currentSection.content?.map((notification) =>
      generateMessage(template, notification)
    );

    setMessages((prevMessages) => {
      // Cek apakah pesan baru sama dengan yang lama, jika sama tidak update state
      if (JSON.stringify(prevMessages) === JSON.stringify(newMessages)) {
        return prevMessages;
      }
      return newMessages;
    });
  }, [currentSection, template]);

  useEffect(() => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((contentItem, index) => ({
                ...contentItem,
                showContentCard: messages[index] || contentItem.showContentCard,
              })),
              currentTemplate: template,
            }
          : section
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const [bgColor, setBgColor] = useState(
    currentSection?.variant?.style?.bgColor || "#ffffff"
  );
  const [titleColor, setTitleColor] = useState(
    currentSection?.variant?.style?.titleColor || "#000000"
  );
  const [position, setPosition] = useState(positionOptions[3]);
  const [imageSize, setImageSize] = useState(imageSizeOptions[1]);
  const [shadow, setShadow] = useState(shadowOptions[2]);
  const [rounded, setRounded] = useState(roundedOptions[2]);
  const [linkTo, setLinkTo] = useState(linkToOptions[1]);
  const [isProductNameShown, setIsProductNameShown] = useState(
    isShowOptions[0]
  );
  const [isProductPriceShown, setIsProductPriceShown] = useState(
    isShowOptions[0]
  );
  const [isTimeShown, setIsTimeShown] = useState(isShowOptions[0]);

  const { productColor, priceColor, timeColor } =
    currentSection?.variant?.style || {};

  const [selectedProductColor, setSelectedProductColor] = useState(
    productColor || "#000000"
  );

  const [selectedPriceColor, setSelectedPriceColor] = useState(
    priceColor || "#FF8510"
  );

  const [selectedTimeColor, setSelectedTimeColor] = useState(
    timeColor || "#C1C1C1"
  );

  useEffect(() => {
    setBgColor(currentSection?.variant?.style?.bgColor || "#ffffff");
    setTitleColor(currentSection?.variant?.style?.titleColor || "#000000");

    const currentPosition = positionOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.position
    );

    if (currentPosition) {
      setPosition(currentPosition);
    }

    const currentImageSize = imageSizeOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.imageSize
    );
    if (currentImageSize) {
      setImageSize(currentImageSize);
    }

    const currentShadow = shadowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.shadow
    );
    if (currentShadow) {
      setShadow(currentShadow);
    }

    const currentRounded = roundedOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.rounded
    );
    if (currentRounded) {
      setRounded(currentRounded);
    }

    const currentLinkTo = linkToOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.linkTo
    );
    if (currentLinkTo) {
      setLinkTo(currentLinkTo);
    }

    const productNameOption = isShowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.isProductNameShown
    );
    if (productNameOption) setIsProductNameShown(productNameOption);

    const productPriceOption = isShowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.isProductPriceShown
    );
    if (productPriceOption) setIsProductPriceShown(productPriceOption);

    const timeOption = isShowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.isTimeShown
    );
    if (timeOption) setIsTimeShown(timeOption);
  }, [currentSection]);

  const handleChangeStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              variant: {
                ...section.variant,
                style: {
                  ...section.variant.style,
                  [key]: value,
                },
              },
            }
          : section
      )
    );
  };

  const textareaRef = useRef(null);

  const autoResize = (el) => {
    if (el) {
      el.style.height = "40px"; // Reset height
      el.style.height = `${el.scrollHeight}px`; // Sesuaikan dengan konten
    }
  };

  useEffect(() => {
    // Gunakan requestAnimationFrame agar eksekusi terjadi setelah rendering selesai
    requestAnimationFrame(() => autoResize(textareaRef.current));
  }, [template, currentSection.content]);

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={bgColor}
          label="Background"
          onChange={(color) => {
            setBgColor(color);
            handleChangeStyle("bgColor", color);
          }}
        />

        <ColorPicker
          initialColor={titleColor}
          label="Judul"
          onChange={(color) => {
            setTitleColor(color);
            handleChangeStyle("titleColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        {isProductNameShown.value && (
          <ColorPicker
            initialColor={selectedProductColor}
            label="Produk"
            onChange={(color) => {
              setSelectedProductColor(color);
              handleChangeStyle("productColor", color);
            }}
          />
        )}

        {isProductPriceShown.value && (
          <ColorPicker
            initialColor={selectedPriceColor}
            label="Harga"
            onChange={(color) => {
              setSelectedPriceColor(color);
              handleChangeStyle("priceColor", color);
            }}
          />
        )}
      </div>

      <div className="mb-2">
        {isTimeShown.value && (
          <ColorPicker
            initialColor={selectedTimeColor}
            label="Waktu"
            onChange={(color) => {
              setSelectedTimeColor(color);
              handleChangeStyle("timeColor", color);
            }}
          />
        )}
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Posisi"
          options={positionOptions}
          onChange={(selectedOption) => {
            setPosition(selectedOption);
            handleChangeStyle("position", selectedOption.value);
          }}
          value={position}
          width="50"
        />

        <SelectOptions
          label="Ukuran Gambar"
          options={imageSizeOptions}
          onChange={(selectedOption) => {
            setImageSize(selectedOption);
            handleChangeStyle("imageSize", selectedOption.value);
          }}
          value={imageSize}
          width="50"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Melingkar"
          options={roundedOptions}
          onChange={(selectedOption) => {
            setRounded(selectedOption);
            handleChangeStyle("rounded", selectedOption.value);
          }}
          value={rounded}
          width="50"
        />

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={(selectedOption) => {
            setShadow(selectedOption);
            handleChangeStyle("shadow", selectedOption.value);
          }}
          value={shadow}
          width="50"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Link Ke"
          options={linkToOptions}
          onChange={(selectedOption) => {
            setLinkTo(selectedOption);
            handleChangeStyle("linkTo", selectedOption.value);
          }}
          value={linkTo}
          width="50"
        />

        <SelectOptions
          label="Nama Produk"
          options={isShowOptions}
          onChange={(selectedOption) => {
            setIsProductNameShown(selectedOption);
            handleChangeStyle("isProductNameShown", selectedOption.value);
          }}
          value={isProductNameShown}
          width="50"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Harga"
          options={isShowOptions}
          onChange={(selectedOption) => {
            setIsProductPriceShown(selectedOption);
            handleChangeStyle("isProductPriceShown", selectedOption.value);
          }}
          value={isProductPriceShown}
          width="50"
        />

        <SelectOptions
          label="Waktu"
          options={isShowOptions}
          onChange={(selectedOption) => {
            setIsTimeShown(selectedOption);
            handleChangeStyle("isTimeShown", selectedOption.value);
          }}
          value={isTimeShown}
          width="50"
        />
      </div>

      <div className="form-group">
        <div style={{ gap: 8 }} className="d-flex align-items-center mb-2">
          <label style={{ margin: 0 }} htmlFor="textAreaSales">
            Judul
          </label>
          <CTooltip
            content={
              <div
                style={{
                  whiteSpace: "pre-line",
                  textAlign: "left",
                  lineHeight: "1",
                }}
              >
                {`
        Kamu bisa menggunakan variabel berikut di sini:
        
        {{ name }} = Nama pembeli
        
        {{ location }} = Lokasi pembeli
        
        {{ time }} = Waktu pembelian
        
        {{ productName }} = Nama produk
        
        {{ price }} = Harga produk

      `}
              </div>
            }
          >
            <FaCircleInfo size={12} />
          </CTooltip>
        </div>
        <textarea
          ref={textareaRef}
          id="textAreaSales"
          className="form-control"
          rows="1"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          style={{
            overflow: "hidden",
            resize: "none",
            padding: 10,
            boxSizing: "border-box",
            minHeight: "50px",
          }}
        ></textarea>
      </div>

      {currentSection?.variant?.style?.linkTo && (
        <div>
          <h5>Fire Event</h5>
          <FacebookPixel />
        </div>
      )}
    </div>
  );
};

export default UpdateDesign;

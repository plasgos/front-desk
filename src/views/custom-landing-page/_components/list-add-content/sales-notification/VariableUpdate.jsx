import React, { useEffect, useRef, useState } from "react";
import SelectOptions from "../../common/SelectOptions";
import Checkbox from "../../common/Checkbox";
import { createUniqueID } from "../../../../../lib/unique-id";

const typeVariableOptions = [
  { value: "custom", label: "Custom" },
  { value: "data-from-order", label: "Data dari order" },
];

const VariableUpdate = ({ setPreviewSection, currentSection }) => {
  const [typeVariable, setTypeVariable] = useState(typeVariableOptions[0]);

  const [isRandomList, setIsRandomList] = useState(
    currentSection?.isRandomList || false
  );

  const [variables, setVariables] = useState([
    {
      id: createUniqueID([]),
      name: "boy",
      location: "Jakarta , Indonesia",
      time: "14:00",
    },
    {
      id: createUniqueID([]),
      name: "john",
      location: "Jakarta , Indonesia",
      time: "14:00",
    },
  ]);
  console.log("🚀 ~ VariableUpdate ~ variables:", variables);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState(variables[0]?.name);

  const handleUpdateVariable = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              [key]: value,
            }
          : section
      )
    );
  };

  const nameRef = useRef(null);

  const autoResize = (el) => {
    if (el) {
      el.style.height = "auto"; // Reset height
      el.style.height = `${el.scrollHeight}px`; // Sesuaikan dengan konten
    }
  };

  useEffect(() => {
    // Gunakan requestAnimationFrame agar eksekusi terjadi setelah rendering selesai
    requestAnimationFrame(() => autoResize(nameRef.current));
  }, [name]);

  // Fungsi untuk menambah data baru saat Enter ditekan
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter" && name.trim() !== "") {
  //       const newVariable = {
  //         id: createUniqueID([]),
  //         name: name,
  //         location: "Jakarta , Indonesia", // Lokasi default, bisa diganti
  //         time: new Date().toLocaleTimeString([], {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         }),
  //       };
  //       setVariables((prev) => [...prev, newVariable]); // Tambah item baru
  //       setName(""); // Reset input
  //     }
  //   };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && name.trim() !== "") {
      if (variables.length > 0) {
        // Jika ada item pertama, update name-nya
        const updatedVariables = [...variables];
        updatedVariables[0].name = name;
        setVariables(updatedVariables);
      } else {
        // Jika tidak ada item, tambahkan item baru
        const newVariable = {
          id: createUniqueID([]),
          name: name,
          location: "Jakarta, Indonesia",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setVariables((prev) => [...prev, newVariable]);
      }
      setName(""); // Reset input setelah Enter
    }
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Melingkar"
          options={typeVariableOptions}
          onChange={(selectedOption) => {
            setTypeVariable(selectedOption);
            handleUpdateVariable("typeVariable", selectedOption.value);
          }}
          value={typeVariable}
          width="50"
        />

        <Checkbox
          id="random-list"
          label="Urutan Acak"
          checked={isRandomList}
          onChange={(e) => {
            const { checked } = e.target;
            setIsRandomList(checked);
            handleUpdateVariable("isRandomList", checked);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nameVariableSales">Judul</label>
        <textarea
          ref={nameRef}
          id="nameVariableSales"
          className="form-control"
          rows="1"
          onKeyDown={handleKeyDown}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            autoResize(e.target);
          }}
          style={{
            overflow: "hidden",
            resize: "none",
            padding: 10,
            boxSizing: "border-box",
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default VariableUpdate;

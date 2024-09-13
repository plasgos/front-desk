// import { useEffect, useState } from "react";
// import { library } from "@fortawesome/fontawesome-svg-core";

// // Custom hook to load and manage Font Awesome icons
// export const useFontAwesomeIconPack = () => {
//   const [iconPack, setIconPack] = useState();

//   useEffect(() => {
//     if (!iconPack) {
//       import("@fortawesome/free-solid-svg-icons").then((module) => {
//         // Delete problematic icons
//         const fas = { ...module.fas };
//         delete fas.faCookie;
//         delete fas.faFontAwesomeLogoFull;
//         // console.log(Object.keys(fas).length);

//         // Map icons to required format
//         const icons = Object.values(fas).map((icon) => ({
//           prefix: icon.prefix,
//           icon: icon.icon,
//           iconName: icon.iconName,
//         }));
//         library.add(...icons);
//         setIconPack(icons);
//       });
//     }
//   }, [iconPack]);

//   return iconPack;
// };

import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";

// Custom hook to load and manage Font Awesome icons
export const useFontAwesomeIconPack = () => {
  const [iconPack, setIconPack] = useState([]);

  useEffect(() => {
    if (iconPack.length === 0) {
      Promise.all([
        import("@fortawesome/free-solid-svg-icons"),
        import("@fortawesome/free-brands-svg-icons"), // Import brand icons
      ])
        .then(([solidIcons, brandIcons]) => {
          // Logging imported icons
          // console.log("Solid Icons:", solidIcons);
          // console.log("Brand Icons:", brandIcons);

          // Delete problematic icons from solid pack if necessary
          const fas = { ...solidIcons.fas };
          delete fas.faCookie;
          delete fas.faFontAwesomeLogoFull;

          // Map icons from solid pack
          const solidMappedIcons = Object.values(fas).map((icon) => ({
            prefix: icon.prefix || "fas", // Default to "fas" if prefix is undefined
            icon: icon.icon,
            iconName: icon.iconName,
          }));

          // Extract brand icons properly from the brandIcons object
          const fab = { ...brandIcons.fab };
          const brandMappedIcons = Object.values(fab).map((icon) => ({
            prefix: icon.prefix || "fab", // Default to "fab" if prefix is undefined
            icon: icon.icon,
            iconName: icon.iconName,
          }));

          // Add all icons to the library
          library.add(...solidMappedIcons, ...brandMappedIcons);

          // Log mapped icons
          // console.log("Mapped Icons:", [
          //   ...solidMappedIcons,
          //   ...brandMappedIcons,
          // ]);

          // Set state for icons
          setIconPack([...solidMappedIcons, ...brandMappedIcons]);
        })
        .catch((error) => {
          console.error("Error loading icons:", error);
        });
    }
  }, [iconPack]);

  return iconPack;
};

import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";

// Custom hook to load and manage Font Awesome icons
export const useFontAwesomeIconPack = () => {
  const [iconPack, setIconPack] = useState();

  useEffect(() => {
    if (!iconPack) {
      import("@fortawesome/free-solid-svg-icons").then((module) => {
        // Delete problematic icons
        const fas = { ...module.fas };
        delete fas.faCookie;
        delete fas.faFontAwesomeLogoFull;
        // console.log(Object.keys(fas).length);

        // Map icons to required format
        const icons = Object.values(fas).map((icon) => ({
          prefix: icon.prefix,
          icon: icon.icon,
          iconName: icon.iconName,
        }));
        library.add(...icons);
        setIconPack(icons);
      });
    }
  }, [iconPack]);

  return iconPack;
};

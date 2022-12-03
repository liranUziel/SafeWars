import ColorModeToggle from "./ColorModeToggle";

const Footer = () => {
  return (
    <footer className="flex dark:bg-dark-accenet-900 bg-light-accent-900 p-6 w-full justify-between">
      <span className="block text-sm font-bold text-white">
        © 2022 Liran Uziel && Gabriel Milshtein. All Rights Reserved.
      </span>
      <ColorModeToggle />
    </footer>
  );
};

export default Footer;

import { ThemeSwitcher } from "./theme-switcher";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
      <p>
        Developed by{" "}
        <a
          href="https://github.com/sayyedarib"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          sayyedarib
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
}

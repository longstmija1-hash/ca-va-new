import { assetPath } from "@/lib/site-data";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`logo-img ${className}`.trim()}
      src={assetPath("/assets/logo-cava.png")}
      alt="Ça Va - haircuts & beauty"
    />
  );
}

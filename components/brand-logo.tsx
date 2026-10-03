import Image from "next/image";

type BrandLogoProps = {
  width?: number;
  priority?: boolean;
};

export default function BrandLogo({ width = 232, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/image/brand-logo.svg"
      alt="Digital Supremacy"
      width={width}
      height={Math.round((width * 1873) / 8002)}
      priority={priority}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

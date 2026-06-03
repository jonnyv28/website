import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/venegas-logo.png"
        alt="VENEGAS LOGISTICS"
        width={1200}
        height={400}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  );
}

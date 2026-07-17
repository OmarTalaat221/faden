import { cn } from "@/lib/utils";

export default function Container({ as: Tag = "div", className, children }) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-8 2xl:px-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

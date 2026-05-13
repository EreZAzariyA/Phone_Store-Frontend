import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    position="top-center"
    toastOptions={{
      classNames: {
        toast: "border border-stone-200 bg-white text-stone-950 dark:border-ps-border dark:bg-ps-card dark:text-gray-100",
        success: "text-green-600 dark:text-green-400",
        error: "text-red-600 dark:text-red-400",
      },
    }}
    {...props}
  />
);

export { Toaster };

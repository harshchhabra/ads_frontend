import { useEffect } from "react";

interface Props {
  error: {
    message: string;
  };
}

const ErrorHandle = ({ error }: Props) => {
  const errorStrings = [
    "Failed to fetch dynamically imported module",
    "error loading dynamically imported module",
  ];
  const shouldReload =
    error?.message && errorStrings.some((str) => error.message.includes(str));

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  if (shouldReload) {
    return <></>;
  }

  return (
    <>
      <h2>Unexpected Application Error!</h2>
      <h3 className="italic">{error?.message}</h3>
      <p>💿 Hey developer 👋</p>
      <p>
        You can provide a way better UX than this when your app throws errors by
        providing your own
        <code className="py-0.5 px-1 bg-[#e3e3e3]">ErrorBoundary</code>
        or
        <code className="py-0.5 px-1 bg-[#e3e3e3]">errorElement</code>
        prop on your route.
      </p>
    </>
  );
};

export default ErrorHandle;

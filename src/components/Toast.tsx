import { ReactElement, useState } from "react";

let setToast: (message: string, isError: boolean) => void;

export default function Toast({ children }: { children: ReactElement }) {
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({
    isError: false,
    message: "",
  });
  setToast = (message: string, isError: boolean = false) => {
    setShow(true);
    setAlert({
      isError,
      message,
    });
    setTimeout(() => {
      setShow(false);
      setAlert({
        isError: false,
        message: "",
      });
    }, 5000);
  };
  return (
    <>
      {show ? (
        <div
          id={`${alert.isError ? "toast-danger" : "toast-success"}`}
          className="flex fixed bottom-2 left-4 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${
              alert.isError
                ? "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
                : "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
            } rounded-lg dark:bg-green-800 dark:text-green-200`}
          >
            {alert.isError ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                <span className="sr-only">Check icon</span>
              </svg>
            )}
          </div>
          <div className="ms-3 text-sm font-normal">{alert.message}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={() => setShow(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
      {children}
    </>
  );
}
export const setGlobalToast = (message: string, isError: boolean = false) => {
  setToast(message, isError);
};

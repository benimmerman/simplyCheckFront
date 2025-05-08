import { useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const typeConfig = {
  success: {
    icon: <CheckCircleIcon className="w-6 h-6 text-green-600" />,
    bg: "bg-green-100",
    text: "text-green-800",
  },
  error: {
    icon: <XCircleIcon className="w-6 h-6 text-red-600" />,
    bg: "bg-red-100",
    text: "text-red-800",
  },
  warning: {
    icon: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />,
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  info: {
    icon: <InformationCircleIcon className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
};

export const AlertBanner = ({
  type = "info",
  message,
  dismissible = true,
  setErrorMessage,
}) => {
  const [visible, setVisible] = useState(true);
  const { icon, bg, text } = typeConfig[type] || typeConfig.info;

  if (!visible) return null;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-sm ${bg} ${text}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={() => {
            setVisible(false);
            setErrorMessage(false);
          }}
          className="text-xl font-bold ml-4"
        >
          <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      )}
    </div>
  );
};

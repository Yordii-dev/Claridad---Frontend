import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";

export default function AlertComponent({
  variant,
  visible,
  title,
  description,
  actionClose = () => {},
}: any) {
  const [showAlert, setShowAlert] = useState(visible);

  const hanlderClose = (e: any) => {
    setShowAlert(false);
    actionClose();
  };
  useEffect(() => {
    setShowAlert(visible);
  }, [visible]);
  return (
    <div>
      {showAlert && (
        <div className="d-flex justify-content-end pt-4 px-5 fixed-top">
          <Alert severity={variant}>
            <div className="d-flex justify-content-between align-align-items-center">
              <AlertTitle>{title}</AlertTitle>
              <span role="button" onClick={hanlderClose}>
                X
              </span>
            </div>
            {description}
          </Alert>
        </div>
      )}
    </div>
  );
}

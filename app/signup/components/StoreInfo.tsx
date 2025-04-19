import Loader from "../../(shared)/components/Loader/Loader";
import useStoreInfo from "../hooks/useStoreInfo";
import { START } from "../consts/signUp";

import { SignUpTextField } from "./inputs/TextField";
import HeaderLayoutComponent from "./HeaderLayout";

const StoreInfoComponent = () => {
  const {
    formProps,
    storeNameProps,
    checkBoxProps,
    reasonProps,
    disabled,
    isLoading,
    errorMessage,
  } = useStoreInfo();

  const { label, checked, onChange, onClick } = checkBoxProps;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeaderLayoutComponent />

      <div className="signup-cont">
        {isLoading && <Loader />}

        <p className="signup-title">
          마지막 입니다. <br />
          어느 매장에서 사용하시나요?
        </p>

        <form {...formProps}>
          <SignUpTextField {...storeNameProps} />
          <div className="signup-form-group">
            <label className="signup-check-box-label" aria-label={label}>
              <input
                type="checkbox"
                className="signup-check-box-input"
                onClick={onClick}
                onChange={onChange}
              />
              {label}
            </label>
          </div>
          {checked && <SignUpTextField {...reasonProps} />}
          <button className="signup-btn" type="submit" disabled={disabled}>
            {START}
          </button>
          <div className="signup-server-error-message">{errorMessage}</div>
        </form>
      </div>
    </>
  );
};

export default StoreInfoComponent;

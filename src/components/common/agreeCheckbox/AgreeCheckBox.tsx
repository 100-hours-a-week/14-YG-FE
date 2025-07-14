import { forwardRef, useState } from "react";
import * as S from "./AgreeCheckBox.styled";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: string;
  helperText?: string;
  info?: string;
  boxStyle?: "circle" | "box";
}

const AgreeCheckBox = forwardRef<HTMLInputElement, Props>(
  (
    { label, helperText, message, info, boxStyle = "circle", ...props },
    ref
  ) => {
    const isChecked = props.checked ?? false;
    const [open, setOpen] = useState(false);

    return (
      <S.Wrapper $boxStyle={boxStyle}>
        {label && (
          <S.PartName onClick={() => setOpen((prev) => !prev)}>
            {label}
          </S.PartName>
        )}
        {open && <S.Info>{info}</S.Info>}

        <S.Row $boxStyle={boxStyle}>
          <S.AgreePart>
            <S.HiddenInput type="checkbox" ref={ref} {...props} />
            {boxStyle === "box" ? (
              isChecked ? (
                <S.StyledCheckBox />
              ) : (
                <S.StyledNonCheckBox />
              )
            ) : isChecked ? (
              <S.StyledCheckCircle />
            ) : (
              <S.StyledNonCheckCircle />
            )}
            {message && <S.LabelText>{message}</S.LabelText>}
          </S.AgreePart>
          {helperText && <S.ErrorText>{helperText}</S.ErrorText>}
        </S.Row>
      </S.Wrapper>
    );
  }
);

AgreeCheckBox.displayName = "AgreeCheckbox";

export default AgreeCheckBox;

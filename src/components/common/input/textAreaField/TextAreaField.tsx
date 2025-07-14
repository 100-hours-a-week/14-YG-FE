import { forwardRef } from "react";
import * as S from "./TextAreaField.styled";
import { stripTrailingBr } from "../../../../utils/stripTrailingBr";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder: string;
  helperText?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, helperText, placeholder, value, ...props }, ref) => {
    const cleanedValue =
      typeof value === "string" ? stripTrailingBr(value) : value;

    return (
      <S.Container>
        {label && <S.Label>{label}</S.Label>}
        <S.TextArea
          placeholder={placeholder}
          ref={ref}
          value={cleanedValue}
          {...props}
        />
        {helperText && <S.HelperText>{helperText}</S.HelperText>}
      </S.Container>
    );
  }
);

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;

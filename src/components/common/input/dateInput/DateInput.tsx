import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./DateInput.styed";

interface DateInputProps {
  label?: string;
  value?: Date;
  placeholder?: string;
  onChange?: (date: Date | null) => void;
  helperText?: string;
}

const DateInput = ({
  label,
  value,
  placeholder,
  onChange,
  helperText,
}: DateInputProps) => {
  const now = new Date();
  const selectedDate = value ?? now;

  const isToday = selectedDate.toDateString() === now.toDateString();

  const commonProps = {
    selected: value,
    onChange,
    showTimeSelect: true,
    dateFormat: "yyyy.MM.dd h:mm aa",
    placeholderText: placeholder,
    customInput: <S.Input />,
    popperPlacement: "bottom-start" as const,
    minDate: now,
  };

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <DatePicker
        {...commonProps}
        {...(isToday && {
          minTime: now,
          maxTime: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59
          ),
        })}
      />
      {helperText && <S.HelperText>{helperText}</S.HelperText>}
    </S.Container>
  );
};

export default DateInput;

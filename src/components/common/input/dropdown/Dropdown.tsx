import Select, {
  components,
  StylesConfig,
  Props as ReactSelectProps,
  OptionProps,
} from "react-select";
import * as S from "./Dropdown.styled";
import { Colors } from "../../../../styles";
import { HelperText } from "../../HelperText.styled";

interface Option {
  value: number;
  label: string;
}

interface DropdownProps
  extends Omit<
    ReactSelectProps<Option, false>,
    "options" | "onChange" | "value"
  > {
  label?: string;
  options: Option[];
  width?: string;
  helperText?: React.ReactNode;
  value?: Option | null; // ✅ 명시적으로 nullable
  onChange?: (value: Option | null) => void; // ✅ 명시적으로 nullable
  disabled?: boolean;
}

const customStyles: StylesConfig<Option, false> = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: "8px",
    border: `1px solid ${Colors.Grayscale50}`,
    height: "40px",
    padding: "0 4px",
    boxShadow: "none",
    ":hover": {
      borderColor: Colors.Grayscale60,
    },
    ":focus": {
      borderColor: Colors.Grayscale60,
    },
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: 270,
    overflowY: "auto",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    fontFamily: "Pretendard",
    fontSize: "12px",
    fontWeight: 500,
    gap: 8,
    padding: 10,
    backgroundColor: state.isSelected
      ? "#F0F0F0"
      : state.isFocused
        ? "#FAFAFA"
        : "#FFF",
    color: Colors.Grayscale60,
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: Colors.Grayscale60,
    fontFamily: "Pretendard",
    fontSize: "12px",
    fontWeight: 500,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: Colors.Grayscale50,
    fontFamily: "Pretendard",
    fontSize: "12px",
    fontWeight: 500,
  }),
};

const CustomOption = (props: OptionProps<Option, false>) => {
  const {
    isSelected,
    data: { label },
  } = props;

  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            border: "2px solid #ccc",
            backgroundColor: isSelected ? "#ff4500" : "transparent",
          }}
        />
        {label}
      </div>
    </components.Option>
  );
};

const Dropdown = ({
  label,
  options,
  width,
  helperText,
  onChange,
  ...props
}: DropdownProps) => {
  const handleChange = (option: Option | null) => {
    onChange?.(option);
  };
  return (
    <S.Container $width={width}>
      {label && <S.Label>{label}</S.Label>}
      <Select
        options={options}
        styles={customStyles}
        components={{ Option: CustomOption }}
        onChange={handleChange} // ✅ 이 줄을 명시적으로 추가!
        value={props.value ?? null} // ✅ 이 줄도 명시적으로 보장
        isDisabled={props.disabled}
        {...props}
      />
      {helperText && <HelperText>{helperText}</HelperText>}
    </S.Container>
  );
};

export default Dropdown;

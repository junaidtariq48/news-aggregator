import Select from "react-select";

type Props = {
  label: string;
  field: string;
  options: string[];
  values: string[];
  onChange: (field: string, values: string[]) => void;
};

// type Props = {
//     label: string;
//     field: string;
//     options: string[];
//     values: string[];
//     onChange: (field: string, values: string[]) => void;
//   };

export default function PreferenceSelect({
  label,
  field,
  options,
  values,
  onChange,
}: Props) {
  const mappedOptions = options.map((opt) => ({ label: opt, value: opt }));
  const selected = values.map((val) => ({ label: val, value: val }));

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <Select
        isMulti
        options={mappedOptions}
        value={selected}
        onChange={(selectedOptions) =>
          onChange(
            field,
            selectedOptions.map((opt) => opt.value)
          )
        }
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}

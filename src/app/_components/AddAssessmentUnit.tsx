"use client";
import { assuranceAPI } from "@/libs/api";
import { useState, ChangeEvent, FormEvent } from "react";

type FormDataType = {
  policyNumber: string | null;
  policyOwnerName: string | null;
  mobile: string | null;
  gender: "Male" | "Female";
  address: string | null;
  applicantsType: "Adult" | "Child";
  isRequiredMedical: boolean | null;
  isRequiredTest: boolean | null;
  requiredTest: string | null;
  // bankName: string | null;
  agentCode: string | null;
};

export const AddAssessmentUnit = () => {
  const [formData, setFormData] = useState<FormDataType>({
    policyNumber: "",
    policyOwnerName: "",
    mobile: "",
    gender: "Male",
    address: "",
    applicantsType: "Adult",
    isRequiredMedical: false,
    isRequiredTest: false,
    requiredTest: "",
    // bankName: "",
    agentCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  const transformLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "radio"
          ? value === "true"
            ? true
            : value === "false"
            ? false
            : null
          : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFocus = (fieldName: string) => {
    setIsEditing((prevState) => ({ ...prevState, [fieldName]: true }));
  };

  const handleBlur = (fieldName: string) => {
    setIsEditing((prevState) => ({ ...prevState, [fieldName]: false }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof FormDataType;
      if (
        !formData[typedKey] &&
        !["requiredTest", "isRequiredTest", "isRequiredMedical"].includes(
          typedKey
        )
      ) {
        newErrors[typedKey] = `${transformLabel(typedKey)} is required.`;
      }
    });

    if (formData.isRequiredMedical === null)
      newErrors["isRequiredMedical"] = "Medical requirement is required.";
    if (formData.isRequiredTest === null)
      newErrors["isRequiredTest"] = "Test requirement is required.";
    if (formData.isRequiredTest === true && !formData.requiredTest)
      newErrors["requiredTest"] = "Required test is mandatory.";
    // if (!formData.bankName) newErrors["bankName"] = "Bank Name is required.";
    if (!formData.agentCode) newErrors["agentCode"] = "Agent Code is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { success, message } = await assuranceAPI.addAppoinments(
        formData
      );
      if (!success) {
        setErrors({ mobile: "Mobile number already exists." });
        return;
      }
      alert("Policy data saved successfully!");
      setErrors({});
    } catch (error) {
      console.error("Error saving policy data:", error);
      alert("Error saving policy data");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Add User
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {Object.keys(formData).map((key) => {
          if (key === "requiredTest" && !formData.isRequiredTest) return null;
          return (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
                {transformLabel(key)}
              </label>
              {key === "gender" || key === "applicantsType" ? (
                <select
                  name={key}
                  value={(formData[key as keyof FormDataType] as string) || ""}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg w-full shadow-sm focus:outline-none"
                >
                  {key === "gender" ? (
                    <>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </>
                  ) : (
                    <>
                      <option value="Adult">Adult</option>
                      <option value="Child">Child</option>
                    </>
                  )}
                </select>
              ) : key === "isRequiredMedical" || key === "isRequiredTest" ? (
                <div className="flex gap-6 mt-2">
                  {[true, false].map((val) => (
                    <label
                      key={String(val)}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        name={key}
                        value={String(val)}
                        checked={formData[key as keyof FormDataType] === val}
                        onChange={handleChange}
                        className="border-gray-300 text-blue-500 focus:ring-2"
                      />
                      {val ? "Yes" : "No"}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={String(formData[key as keyof FormDataType]) || ""}
                  onChange={handleChange}
                  onFocus={() => handleFocus(key)}
                  onBlur={() => handleBlur(key)}
                  className="mt-2 p-3 border rounded-lg w-full shadow-sm focus:outline-none"
                />
              )}
              {errors[key] && (
                <p className="text-red-500 text-xs mt-2">{errors[key]}</p>
              )}
            </div>
          );
        })}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  );
};

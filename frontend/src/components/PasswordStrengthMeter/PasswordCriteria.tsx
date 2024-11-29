import { Check, X } from "lucide-react";

interface PasswordCriteriaProps {
  password: string;
}

const criteriaList = [
  {
    label: "At least 6 characters",
    test: (password: string) => password.length >= 6,
  },
  {
    label: "Contains uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "Contains lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "Contains a number",
    test: (password: string) => /\d/.test(password),
  },
  {
    label: "Contains special character",
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
];

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({ password }) => {
  return (
    <div className="mt-2 space-y-1">
      {criteriaList.map((criterion) => {
        const isMet = criterion.test(password);
        return (
          <div key={criterion.label} className="flex items-center text-xs">
            {isMet ? (
              <Check className="size-4 text-green-500 mr-2" />
            ) : (
              <X className="size-4 text-gray-500 mr-2" />
            )}
            <span className={isMet ? "text-green-500" : "text-gray-400"}>
              {criterion.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordCriteria;

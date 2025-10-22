function CountEmployees({ count }: { count: number }) {
  const employeeText = count === 1 ? "Employee" : "Employees";

  return (
    <div className="text-xl font-semibold text-[#F5F5F6]" aria-live="polite">
      {count} {employeeText}
    </div>
  );
}

export default CountEmployees;

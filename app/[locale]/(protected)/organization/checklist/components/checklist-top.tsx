import Image from "next/image";

function ChecklistTop() {
  return (
    <div className="grid grid-cols-12 items-center gap-10 py-10">
      <div className="col-span-12 lg:col-span-5">
        <div className="w-full">
          <Image
            src="/images/organization/organization-car.png"
            alt="checklist"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7">
        <div className="max-w-[476px]">
          <h1 className="mb-4 text-xl font-semibold text-default-900">
            Daily Operations Checklist
          </h1>
          <p className="text-default-700">
            Ensure operational excellence with structured start and end of day
            routines, designed to optimize performance and maintain high
            standards of service and safety throughout your establishment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChecklistTop;

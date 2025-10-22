"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import FileUploader from "@/components/form/file-uploader2";
import { TimePicker } from "@/components/ui/TimePicker";

function FormsPage() {
  const [squareFiles, setSquareFiles] = useState<File[]>([]);
  const [landscapeFiles, setLandscapeFiles] = useState<File[]>([]);
  const [portraitFiles, setPortraitFiles] = useState<File[]>([]);

  // FileInputButton states
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? new Date());
    setEndDate(end ?? null);
  };
  const isCurrentDay = false;
  return (
    <div className="mx-auto max-w-[800px] space-y-8 py-20">
      <TimePicker
        value="08:00"
        label="Time"
        disabledHours={isCurrentDay ? [0, 1, 2, 3, 4, 5, 6, 7] : undefined}
        disabledMinutes={isCurrentDay ? [0, 1, 2, 3, 4, 5, 6, 7] : undefined}
      />

      <div className="react-calender">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          monthsShown={2}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 60))}
          // timeFormat="HH:mm"
          // dateFormat="MM/dd/yyyy h:mm aa"
          // showTimeSelect
          // timeIntervals={15}
          timeCaption="time"
          // dateFormatCalendar="MMMM"
        />

        <div>
          <h2 className="mb-4 text-xl font-semibold">Square Crop (1:1)</h2>
          <FileUploader
            files={squareFiles}
            setFiles={setSquareFiles}
            isMultiple={false}
            label="Upload and Crop Image"
            aspectRatio={1 / 5}
            cropWidth={100}
            cropHeight={500}
          />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Landscape Crop (16:9)</h2>
          <FileUploader
            files={landscapeFiles}
            setFiles={setLandscapeFiles}
            isMultiple={false}
            label="Upload and Crop Image"
            aspectRatio={16 / 9}
          />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Portrait Crop (3:4)</h2>
          <FileUploader
            files={portraitFiles}
            setFiles={setPortraitFiles}
            isMultiple={false}
            label="Upload and Crop Image"
            aspectRatio={3 / 4}
          />
        </div>
      </div>
    </div>
  );
}

export default FormsPage;

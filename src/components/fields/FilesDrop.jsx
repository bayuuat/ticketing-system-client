import React, { useEffect, useState } from 'react';
import { BiCloudUpload, BiSolidFileBlank } from 'react-icons/bi';

const FileDropZone = ({ selectedFile, setSelectedFile }) => {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    const temp = [];

    if (selectedFile.length === 0) {
      setPreview([]);
      return;
    } else if (selectedFile.length > 0) {
      for (let index = 0; index < selectedFile.length; index++) {
        if (selectedFile[index] instanceof File && selectedFile[index].type.startsWith('image/')) {
          const objectUrl = URL.createObjectURL(selectedFile[index]);
          temp.push(objectUrl);
        } else {
          temp.push(selectedFile[index]);
        }
      }
    }

    setPreview(temp);
    console.log(preview);

    // Free memory when the component is unmounted or when selectedFiles change
    return () => {
      temp.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl);
      });
    };
  }, [selectedFile]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
      setSelectedFile([]);
      return;
    }

    console.log(e.dataTransfer.files);

    setSelectedFile(e.dataTransfer.files);
    setDragging(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile([]);
      return;
    }
    console.log(e.target.files);
    setSelectedFile(e.target.files);
  };

  return (
    <>
      {!!preview.length ? (
        <div className="flex flex-wrap gap-4">
          {!!preview &&
            preview.map((preview, index) =>
              preview instanceof File ? (
                <div className="w-44 h-44 flex flex-col items-center p-2 shadow-md rounded-md border dark:border-gray-900" key={index}>
                  <div className="grow flex items-center">
                    <BiSolidFileBlank className="w-24 h-24 text-gray-300 dark:opacity-60" />
                  </div>
                  <span className="h-1/5 text-center w-full truncate">{preview.name}</span>
                </div>
              ) : (
                <div className="w-44 h-44 shadow-md rounded-md border dark:border-gray-900" key={index}>
                  <img className="w-full h-full rounded-md mr-4 object-cover" src={preview} alt={`Preview ${index}`} />
                </div>
              )
            )}
        </div>
      ) : (
        <div
          className={`flex items-center justify-center w-full file-drop-zone ${dragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-navy-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-navy-100 dark:hover:bg-navy-700/70"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <BiCloudUpload className="w-9 h-9 mb-2 text-gray-500 dark:text-gray-400" />
              {dragging ? (
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Drop your files here</p>
              ) : (
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-200">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-300">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" multiple className="hidden" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.xlsx" />
          </label>
        </div>
      )}
    </>
  );
};

export default FileDropZone;

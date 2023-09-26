import React, { useEffect, useState } from 'react';

import Modal from '@/components/modal';
import InputField from '@/components/fields/InputField';
import { BiSolidBox } from 'react-icons/bi';
import Select from 'react-select';
import customAxios from '@/utils/customAxios';
import TextField from '@/components/fields/TextField';

const ModalCreate = ({ open, onClose, data }) => {
  const [form, setForm] = useState({ tagName: '', departmentID: '' });
  const [options, setOptions] = useState([]);

  const getTicketTagList = async () => {
    try {
      const response = await customAxios.get('/departments/list');

      if (response.status === 200) {
        console.log(response.data);
        const mappedData = response.data.map((data) => {
          return {
            value: data.departmentID,
            label: data.departmentName,
          };
        });
        setOptions(mappedData);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const postTicketTag = async () => {
    try {
      const response = await customAxios.post('/ticket-tag/add', form);

      if (response.status === 200) {
        alert('SUCCESS');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getTicketTagList();
  }, []);

  useEffect(() => {
    console.log(data);
    if (data === 'new') {
      setForm({ tagName: '', departmentID: '', description: '' });
    } else if (data) {
      setForm(data);
    }
  }, [data]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-center mb-3">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
            <BiSolidBox className="text-orange-600 text-xl" />
          </div>
          <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900 dark:text-white">Create New Department</h3>
        </div>
        <div className="mt-4">
          <InputField
            extra="mb-4"
            label="Tag Name"
            placeholder="Customer Service"
            id="tagName"
            type="text"
            value={form.tagName}
            name="tagName"
            onChange={handleFormChange}
          />
          <TextField
            extra="mb-4"
            label="Description"
            rows={4}
            placeholder="Tell more about the tag"
            id="description"
            value={form.description}
            onChange={handleFormChange}
          />
          <label htmlFor="" className="text-sm text-navy-700 dark:text-white font-bold">
            Department
          </label>
          <Select
            options={options}
            className="mt-2"
            value={{ label: form.departmentName }}
            onChange={(e) => setForm({ ...form, departmentID: e.value })}
          />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-navy-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button
            onClick={postTicketTag}
            type="button"
            className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Create
          </button>
        </span>
        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button
            onClick={onClose}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-transparent text-base leading-6 font-medium text-gray-700 dark:text-white dark:border-navy-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            Cancel
          </button>
        </span>
      </div>
    </Modal>
  );
};

export default ModalCreate;

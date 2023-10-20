import React, { useEffect, useState } from 'react';

import Modal from '@/components/modal';
import InputField from '@/components/fields/InputField';
import { BiSolidBox } from 'react-icons/bi';
import customAxios from '@/utils/customAxios';
import Cookies from 'js-cookie';

const defForm= { email: '', password: '', userName: '', name: '', departmentID: '' }

const ModalCreate = ({ open, onClose, data }) => {
  const [form, setForm] = useState(defForm);
  const department_id = Cookies.get('department_id');

  const postTicketTag = async () => {
    const formBody = {
      email: form.email,
      encryptedPassword: form.password,
      userName: form.userName,
      name: form.name,
      departmentID: department_id,
      roleId: 1,
    };
    try {
      const response = await customAxios.post('/users/create', formBody);

      if (response.status === 200) {
        onClose()
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
    if (data === 'new') {
      setForm(defForm);
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
            label="Name"
            placeholder="Type your staff's full name..."
            id="name"
            type="text"
            value={form.name}
            name="name"
            onChange={handleFormChange}
          />
          <InputField
            extra="mb-4"
            label="Username"
            placeholder="Type the username..."
            id="userName"
            type="text"
            value={form.userName}
            name="userName"
            onChange={handleFormChange}
          />
          <InputField
            extra="mb-4"
            label="Email"
            placeholder="Type the email..."
            id="email"
            type="email"
            value={form.email}
            name="email"
            onChange={handleFormChange}
          />
          <InputField
            extra="mb-4"
            label="Password"
            placeholder="Sstt make sure its private..."
            id="password"
            type="password"
            value={form.password}
            name="password"
            onChange={handleFormChange}
          />
          <InputField
            extra="mb-4"
            label="Department ID"
            placeholder="Sstt make sure its private..."
            id="departmentID"
            type="text"
            value={department_id}
            name="departmentID"
            disabled
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

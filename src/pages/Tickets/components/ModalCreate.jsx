import React, { useEffect, useState } from 'react';

import Modal from '@/components/modal';
import { BiSolidBox } from 'react-icons/bi';
import customAxios from '@/utils/customAxios';
import Cookies from 'js-cookie';
import { ComboboxDemo } from '@/components/SearchSelect/new';
import { useToast } from '@/components/shadcn/components/ui/use-toast';

const ModalCreate = ({ open, onClose, ticketID, refetch }) => {
  const [form, setForm] = useState({ userID: '' });
  const [options, setOptions] = useState([]);
  const idDept = Cookies.get('department_id');
  const {toast} = useToast()

  const getStaffsList = async () => {
    try {
      const response = await customAxios.get('/departments/view/staff/' + idDept);

      if (response.status === 200) {
        const user = response.data.users;
        const mappedData = user.map((data) => {
          return {
            value: data.userID,
            label: `${data.userID} - ${data.name}`,
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

  const assignTicket = async (e) => {
    e.preventDefault();
    console.log(ticketID);
    try {
      const response = await customAxios.put(`/tickets/manager/assign/${ticketID}`, form);

      if (response.status === 200) {
        toast({
          title: "Success Assigning Ticket!",
        })
        onClose();
        refetch();
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
    getStaffsList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={assignTicket}>
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex items-center mb-3">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
              <BiSolidBox className="text-orange-600 text-xl" />
            </div>
            <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900 dark:text-white">Assign User</h3>
          </div>
          <div className="mt-4">
            <ComboboxDemo
              listData={options}
              extraClass="mb-4"
              label="User"
              name="userID"
              placeholder="Assign staff to this ticket..."
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-navy-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              onClick={assignTicket}
              type="submit"
              className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Assign
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
      </form>
    </Modal>
  );
};

export default ModalCreate;

import { useEffect, useState } from 'react';

import DevTableTemplate from '@/components/table/DevelopmentTable';
import ModalCreate from '@/pages/Departments/components/ModalCreate';
import customAxios from '@/utils/customAxios';
import ModalDelete from '@/components/modal/ModalDelete';

const columnData = [
  {
    Header: 'ID',
    accessor: 'departmentID',
    width: '20%',
  },
  {
    Header: 'NAME',
    accessor: 'departmentName',
    width: '50%',
  },
  {
    Header: 'USERS',
    accessor: 'users',
    width: '20%',
  },
  {
    Header: 'ACTION',
    accessor: 'action',
    width: '10%',
  },
];

const Department = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const getTicketTagList = async () => {
    try {
      const response = await customAxios.get('/departments/view');
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const deleteDepartment = async () => {
    try {
      const response = await customAxios.delete(`/departments/delete/${selectedData.departmentID}`);

      if (response.status === 204) {
        alert('Success Deleting Data');
        getTicketTagList();
        handleCloseModalDelete();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (data) => {
    setOpenModal(true);
    setSelectedData(data);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenModalDelete = (data) => {
    setOpenModalDelete(true);
    setSelectedData(data);
  };

  useEffect(() => {
    getTicketTagList();
  }, []);

  return (
    <>
      <div className="mt-5">
        <DevTableTemplate
          title={'Deparments Table'}
          columnsData={columnData}
          tableData={data}
          buttonText={'Create New Department'}
          onClickEdit={handleOpenModal}
          onClickDelete={handleOpenModalDelete}
        />
      </div>
      <ModalCreate open={openModal} onClose={handleCloseModal} data={selectedData} refetch={getTicketTagList} />
      <ModalDelete open={openModalDelete} onClose={handleCloseModalDelete} selectedData={selectedData?.departmentName} onDelete={deleteDepartment} />
    </>
  );
};

export default Department;

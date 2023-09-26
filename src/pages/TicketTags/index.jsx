import { useEffect, useState } from 'react';
import customAxios from '@/utils/customAxios';
import DevTableTemplate from '@/components/table/DevelopmentTable';
import ModalCreate from '@/pages/TicketTags/components/ModalCreate';

const columnData = [
  {
    Header: 'ID',
    accessor: 'id',
    width: '10%',
  },
  {
    Header: 'TAG NAME',
    accessor: 'tagName',
    width: '20%',
  },
  {
    Header: 'DEPARTMENT',
    accessor: 'departmentName',
    width: '20%',
  },
  {
    Header: 'DATE',
    accessor: 'createdDate',
    width: '20%',
  },
  {
    Header: 'ACTION',
    accessor: 'action',
    width: '10%',
  },
];

const TicketTags = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const getTicketTagList = async () => {
    try {
      const response = await customAxios.get(`/ticket-tag/list`);
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

  useEffect(() => {
    getTicketTagList();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (data) => {
    setOpenModal(true);
    setSelectedData(data)
  };

  return (
    <>
      <div className="mt-5 ">
        <DevTableTemplate
          title={'Ticket Tag Table'}
          columnsData={columnData}
          tableData={data}
          buttonText={'Create New Department'}
          onClickEdit={handleOpenModal}
        />
      </div>
      <ModalCreate open={openModal} onClose={handleCloseModal} data={selectedData} />
    </>
  );
};

export default TicketTags;

import { useEffect, useState } from 'react';
import customAxios from '@/utils/customAxios';
import DevTableTemplate from '@/components/table/DevelopmentTable';
import ModalCreate from '@/pages/TicketTags/components/ModalCreate';
import ModalDelete from '@/components/modal/ModalDelete';
import { useToast } from '@/components/shadcn/components/ui/use-toast';

const columnData = [
  {
    Header: 'ID',
    accessor: 'tagID',
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
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const {toast} = useToast()

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

  const deleteDepartment = async () => {
    try {
      const response = await customAxios.delete(`/ticket-tag/delete/${selectedData.tagID}`);

      if (response.status === 204) {
        toast({
          title: "Success Deleting Data!",
        })
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

  useEffect(() => {
    getTicketTagList();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setOpenModal(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenModalDelete = (data) => {
    setOpenModalDelete(true);
    setSelectedData(data);
  };

  return (
    <>
      <div className="mt-5 ">
        <DevTableTemplate
          title={'Ticket Tag Table'}
          columnsData={columnData}
          tableData={data}
          buttonText={'Create New Ticket Tags'}
          onClickEdit={handleOpenModal}
          onClickDelete={handleOpenModalDelete}
        />
      </div>
      <ModalCreate open={openModal} onClose={handleCloseModal} data={selectedData} refetch={getTicketTagList} />
      <ModalDelete open={openModalDelete} onClose={handleCloseModalDelete} selectedData={selectedData?.tagName} onDelete={deleteDepartment} />
    </>
  );
};

export default TicketTags;

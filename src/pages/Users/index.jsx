import DevTableTemplate from '@/components/table/DevelopmentTable';
import ModalCreate from '@/pages/Users/components/ModalCreate';
import customAxios from '@/utils/customAxios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const columnData = [
  {
    Header: 'ID',
    accessor: 'userID',
    width: '15%',
  },
  {
    Header: 'NAME',
    accessor: 'name',
    width: '30%',
  },
  {
    Header: 'EMAIL',
    accessor: 'email',
    width: '30%',
  },
  {
    Header: 'USERNAME',
    accessor: 'userName',
    width: '25%',
  },
];

const User = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const idDept = Cookies.get('department_id');

  const getTicketTagList = async () => {
    try {
      const response = await customAxios.get('/departments/view/staff/' + idDept);

      if (response.status === 200) {
        console.log(response.data.users);
        setData(response.data.users);
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
    setSelectedData(data);
  };

  return (
    <div>
      <div className="mt-5 ">
        <DevTableTemplate
          title={'User Table'}
          columnsData={columnData}
          tableData={data}
          buttonText={'Create New User'}
          onClickEdit={handleOpenModal}
        />
      </div>
      <ModalCreate open={openModal} onClose={handleCloseModal} data={selectedData} />
    </div>
  );
};

export default User;

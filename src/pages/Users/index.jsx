import DevTableTemplate from '@/components/table/DevelopmentTable';
import customAxios from '@/utils/customAxios';
import { useEffect, useState } from 'react';

const columnData = [
  {
    Header: 'ID',
    accessor: 'userID',
    width: '10%',
  },
  {
    Header: 'NAME',
    accessor: 'name',
    width: '25%',
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
  {
    Header: 'ACTION',
    accessor: 'action',
    width: '10%',
  },
];

const User = () => {
  const [data, setData] = useState([]);

  const getTicketTagList = async () => {
    try {
      const response = await customAxios.get('/users/list');

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

  return (
    <div>
      <div className="mt-5 ">
        <DevTableTemplate title={"User Table"} columnsData={columnData} tableData={data} />
      </div>
    </div>
  );
};

export default User;

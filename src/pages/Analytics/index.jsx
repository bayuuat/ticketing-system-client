import React, { useEffect, useState } from 'react';

import { IoDocuments } from 'react-icons/io5';
import { MdBarChart } from 'react-icons/md';

import Widget from '@/components/widget/Widget';
import { DatePickerWithRange } from '@/components/shadcn/components/ui/date';
import { ComboboxButton } from '@/components/SearchSelect/comboButton';
import { format, lastDayOfMonth, setDate } from 'date-fns';
import { getCountAllTicket, getCountTicketByDepartment, getCountTicketByUser, getResponseTimePerUser } from '@/pages/Analytics/variables/apiCall';
import Cookies from 'js-cookie';
import SimpleLineChart from '@/pages/Analytics/components/SimpleLineChart';
import DailyResponseChart from '@/pages/Analytics/components/DailyResponseChart';
import { useGetDepartment, useGetUsers } from '@/pages/Analytics/variables/selectApiCall';
import BarChartNew from '@/pages/Analytics/components/BarChart';
import ComplexTable from '@/pages/Analytics/components/ComplexTable';

const initialParam = {
  from: setDate(new Date(), 1),
  to: lastDayOfMonth(new Date()),
};

const columnData = [
  {
    Header: 'ID',
    accessor: 'id',
    width: '10%',
  },
  {
    Header: 'AVG Response',
    accessor: 'avg',
    width: '25%',
  },
  {
    Header: 'MAX Response',
    accessor: 'max',
    width: '25%',
  },
  {
    Header: 'MIN Response',
    accessor: 'min',
    width: '25%',
  },
  {
    Header: 'Ticket Count',
    accessor: 'count',
    width: '20%',
  },
];

const Analytics = () => {
  const idDept = Cookies.get('department_id');
  const idRole = Cookies.get('role_id');
  const [selectedDate, setSelectedDate] = useState({ from: initialParam.from, to: initialParam.to });
  const [fetchData, setFetchData] = useState({ all: 0, depart: 0, responseUser: [] });
  const [departmentID, setDepartmentID] = useState(idDept);
  const [userID, setUserID] = useState();
  const [param, setParam] = useState({
    start_date: format(initialParam.from, "yyyy-MM-dd'T'HH:mm:ss"),
    end_date: format(initialParam.to, "yyyy-MM-dd'T'HH:mm:ss"),
    departmentID: idDept,
    userID: userID,
  });

  const { data: departments } = useGetDepartment();
  const { data: users } = useGetUsers(departmentID);

  const handleDateChange = (e) => {
    setSelectedDate(e);
  };

  const fetchAPI = async () => {
    const allTicket = await getCountAllTicket(param);
    const ticketDepart = await getCountTicketByDepartment(param);
    const userTicket = await getCountTicketByUser(param);
    const responseUser = await getResponseTimePerUser(param);
    return { all: allTicket, depart: ticketDepart, user: userTicket, responseUser: responseUser };
  };

  const handleFilter = () => {
    const date = { start: format(selectedDate.from, "yyyy-MM-dd'T'HH:mm:ss"), end: format(selectedDate.to, "yyyy-MM-dd'T'HH:mm:ss") };
    setParam({ start_date: date.start, end_date: date.end, departmentID: departmentID, userID: userID });
  };

  useEffect(() => {
    const promise = fetchAPI();
    promise.then((result) => {
      setFetchData(result);
    });
  }, [param]);

  return (
    <div className="p-2 relative h-full min-h-screen w-full dark:text-white">
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-navy-800 rounded-lg p-3">
        <span className="text-lg text-navy-700 dark:text-white">Filter:</span>
        <div className="flex gap-4">
          <div className="w-64">
            <ComboboxButton listData={departments} selectedValue={departmentID} onChange={setDepartmentID} disabled={idRole != 1} />
          </div>
          <div className="w-64">
            <ComboboxButton listData={users} selectedValue={userID} onChange={setUserID} disabled={idRole != 1} />
          </div>
          <div className="w-64">
            <DatePickerWithRange selectDate={selectedDate} handleChange={handleDateChange} />
          </div>
          <button
            className="inline-flex justify-between items-center rounded-md border border-gray-300 px-4 py-2 bg-orange-500 text-base leading-6 font-medium text-white dark:text-white dark:border-navy-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-orange-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5 dark:border-white/10"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols- 3xl:grid-cols-6">
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={'All Tickets'} subtitle={fetchData?.all} />
        <Widget icon={<IoDocuments className="h-6 w-6" />} title={'Tickets by Department'} subtitle={fetchData?.depart} />
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={'Tickets by User'} subtitle={fetchData?.user} />
      </div>
      <div className="text-xl mt-5 font-semibold">User Segment</div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 3xl:grid-cols-6">
        <ComplexTable title={'User Data by Department'} columnsData={columnData} tableData={fetchData?.responseUser} />
        <BarChartNew data={fetchData?.responseUser} />
      </div>
      <div className="text-xl mt-5 font-semibold">Department Segment</div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 3xl:grid-cols-6">
        <SimpleLineChart param={param} />
        <DailyResponseChart param={param} />
      </div>
    </div>
  );
};

export default Analytics;

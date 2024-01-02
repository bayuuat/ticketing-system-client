import React, { useEffect, useState } from 'react';
import Card from '@/components/card';
import { CustomTooltip } from '@/pages/Analytics/components/CustomTooltip';
import customAxios from '@/utils/customAxios';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SimpleLineChart = ({ param }) => {
  const [data, setData] = useState();

  const getCountTicketByUser = async () => {
    try {
      const response = await customAxios.get(`tickets/response-time-department/${param.departmentID}`, {
        params: { start_date: param.start_date, end_date: param.end_date, granularity: 'daily' },
      });

      if (response.status === 200) {
        const resp = response.data;
        const mappedData = resp.map(([date, avg, min, max]) => ({
          date: date,
          avg: avg,
          min: min,
          max: max,
        }));
        setData(mappedData);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // alert(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  

  useEffect(() => {
    getCountTicketByUser();
  }, [param]);

  return (
    <Card extra="rounded-[20px] py-6 px-2">
      <div>
        <h4 className="text-lg font-bold text-navy-700 dark:text-white ml-2 mb-2">Daily Response</h4>
      </div>
      <div className="w-full h-80 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 60,
              left: 60,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" axisLine={false} tickLine={false} interval={0} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="avg" stroke="#F97316" strokeWidth={3} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="min" stroke="#F8C010" strokeWidth={3} />
            <Line type="monotone" dataKey="max" stroke="#2364AA" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SimpleLineChart;

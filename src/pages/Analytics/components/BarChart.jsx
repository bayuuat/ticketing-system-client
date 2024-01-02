import React from 'react';
import Card from '@/components/card';
import { CustomTooltip } from '@/pages/Analytics/components/CustomTooltip';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChartNew({ data }) {
  return (
    <Card extra="rounded-[20px] py-6 px-2">
      <div>
        <h4 className="text-lg font-bold text-navy-700 dark:text-white ml-2 mb-2">Monthly User Ticket</h4>
      </div>
      <div className="w-full h-80 flex items-center justify-center text-navy-700 dark:text-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 80,
              left: 80,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} axisLine={false} tickLine={false} interval={0} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#F97316" background={{ fill: '#eee' }} barSize={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

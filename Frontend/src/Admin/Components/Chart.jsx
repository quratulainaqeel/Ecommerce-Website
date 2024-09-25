import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';
import BarChartComponent from './BarChartComponent';

export default function Chart({ orders }) {
    const orderDeliver = orders.filter((order) => order.status == 'Delivered')
    const orderPending = orders.filter((order) => order.status == 'Pending')

    const data = [
        { name: 'Delivered', value: orderDeliver.length },
        { name: 'Pending', value: orderPending.length }

    ];

    const COLORS = ['#00C49F', '#FFBB28'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <>
                <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <text
                    textAnchor={'middle'}
                    dominantBaseline="central"
                    className=' text-danger fw-semibold '
                    style={{ color: 'red', fontSize: '14px' }}
                    x="17%"
                    y="9%"
                    fill='#41464b'
                >
                    ORDERS
                </text>
            </>
        );
    };

    return (
        <div className='d-flex justify-content-around align-items-center mt-4'>

            <BarChartComponent OrdersData={orders} />
            <PieChart width={300} height={300} className='bg-light border border-secondary-subtle rounded'>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={80}
                    paddingAngle={5}
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (

                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

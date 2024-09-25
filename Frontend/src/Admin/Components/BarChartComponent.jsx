import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function BarChartComponent({ OrdersData }) {
    const calculateTotalSalesAndOrdersPerMonth = (ordersData) => {
        const monthlyData = {};

        ordersData.forEach((order) => {
            const orderDate = new Date(order.order_at);
            const yearMonth = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}`;

            if (!monthlyData[yearMonth]) {
                monthlyData[yearMonth] = {
                    totalSales: 0,
                    totalOrders: 0,
                };
            }

            monthlyData[yearMonth].totalSales += parseFloat(order.totalBill); // Convert to number
            monthlyData[yearMonth].totalOrders += 1; // Counting the order
        });

        return Object.keys(monthlyData).map((yearMonth) => ({
            month: yearMonth,
            totalSales: monthlyData[yearMonth].totalSales.toFixed(0), // Fix decimal places
            totalOrders: monthlyData[yearMonth].totalOrders,
        }));
    };

    const data = calculateTotalSalesAndOrdersPerMonth(OrdersData);

    return (
        <BarChart width={600} height={400} data={data} className='bg-light border border-secondary-subtle rounded'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#8884d8" name="Total Sales" />
            <Bar dataKey="totalOrders" fill="#82ca9d" name="Total Orders" />
        </BarChart>
    );
};

import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";
import React, { useState, useEffect } from 'react';

const PieChartCard = ({ dataPieChartCard }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    labels: ["Thành công", "Chờ xác nhận", "Đã hủy"],
    colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    chart: {
      width: "50px",
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: { mode: null },
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000"
      },
    },
  });

  useEffect(() => {
    if (dataPieChartCard && dataPieChartCard.length > 0) {
      var awaitCount = dataPieChartCard.reduce((total, item) => total + item.await, 0);
      var cancelledCount = dataPieChartCard.reduce((total, item) => total + item.cancelled, 0);
      var successfullyCount = dataPieChartCard.reduce((total, item) => total + item.successfully, 0);
    
      setSeries([successfullyCount, awaitCount, cancelledCount]);
    } else {
      setSeries([0, 0, 0]);
    }
      }, [dataPieChartCard]);
  console.log(dataPieChartCard)
  console.log(series)
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Trang thái đơn hàng
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          {/* <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select> */}
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={options} series={series} />
      </div>

      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-[10px] font-normal text-gray-600">Thành công</p>
          </div>
          <p className="mt-px text-x font-bold text-navy-700 dark:text-white">
            {series[0]}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-[10px] font-normal text-gray-600">Chờ</p>
          </div>
          <p className="mt-px text-x font-bold text-navy-700 dark:text-white">
            {series[1]}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#EFF4FB]" />
            <p className="ml-1 text-[10px] font-normal text-gray-600">Đã hủy</p>
          </div>
          <p className="mt-px text-x font-bold text-navy-700  dark:text-white">
            {series[2]}
          </p>
        </div>
      </div>
    </Card>
  );
};


export default PieChartCard;

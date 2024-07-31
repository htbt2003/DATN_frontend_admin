import React, { useEffect, useState } from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";

const TotalSpent = ({ dataTotalSpent, reLoad }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [],
    }
  });

  useEffect(() => {
    if (dataTotalSpent && Array.isArray(dataTotalSpent) && dataTotalSpent.length > 0) {
      const dates = dataTotalSpent.map(item => item.stat_date);
      const revenues = dataTotalSpent.map(item => item.total_revenue ? item.total_revenue : 0);
      const profits = dataTotalSpent.map(item => item.profit ? item.profit : 0);

      console.log("Updating chart options and series", { dates, revenues, profits });

      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          categories: dates,
        }
      }));

      setSeries([
        {
          name: "Danh thu",
          data: revenues,
          color: "#4318FF",
        },
        {
          name: "Lợi nhuận",
          data: profits,
          color: "#6AD2FF",
        },
      ]);
    } else {
      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          categories: [],
        }
      }));
      setSeries([]);
    }
  }, [dataTotalSpent, reLoad]);
  return (
    <Card extra="!p-[20px] h-full text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
        Phân tích bán hàng
          </h4>
          
          {/* <MdOutlineCalendarToday /> */}
          {/* <span className="text-sm font-medium text-gray-600">This month</span> */}
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          {dataTotalSpent ? (
            <LineChart
              options={options}
              series={series}
            />
          ) : (
            <p>No data available</p> // Replace with loading indicator or appropriate message
          )}
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;

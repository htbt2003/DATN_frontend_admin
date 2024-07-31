import TotalSpent from "views/admin/Dashboard/components/TotalSpent";
import PieChartCard from "views/admin/Dashboard/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Loading from '../../../Loading';

import Widget from "components/widget/Widget";
import { useEffect, useState } from "react";
import DashboardServices from '../../../services/DashboardServices';


const Dashboard = () => {
  const [load, setLoad] = useState(false)
  const [reLoad, setReLoad] = useState();

  const [statType, setStatType] = useState('daily');
  const [date, setDate] = useState();
  const [totals, seTotals] = useState({});
  const [dataTotalSpent, setDataTotalSpent] = useState({});
  const [dataPieChartCard, setDataPieChartCard] = useState({});

  ///
  const getCurrentDate = (type) => {
    const now = new Date();
    switch (type) {
      case 'daily':
        return now.toISOString().split('T')[0]; // YYYY-MM-DD
      case 'weekly':
        {
          const dayNum = now.getUTCDay() || 7;
          now.setUTCDate(now.getUTCDate() + 4 - dayNum);
          const yearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
          const weekNum = Math.ceil((((now - yearStart) / 86400000) + 1) / 7);
          return `${now.getUTCFullYear()}-W${weekNum.toString().padStart(2, '0')}`;
        }
      case 'monthly':
        return now.toISOString().substring(0, 7); // YYYY-MM
      case 'yearly':
        return now.getFullYear().toString(); // YYYY
      default:
        return '';
    }
  };
  useEffect(() => {
    setDate(getCurrentDate(statType));
  }, [statType]);

  useEffect(() => {
    const condition = {
      stat_type: statType,
      date: date,
    };

    const fetchData = async () => {
      setLoad(true);
      const result = await DashboardServices.dashboard(condition);
      setDataTotalSpent(result.profits);
      setDataPieChartCard(result.orders);
      seTotals(result.totals);
      setLoad(false);
    };

    fetchData();
  }, [reLoad, statType, date]);

  const handleAction = (e) => {
    setDate(e.target.value);
  };

  const handleType = (e) => {
    setStatType(e.target.value);
  };


console.log(date)
  return (
    <div className="mt-5">
          {load ? (<Loading />) : (<></>)}
      <div>
        <div className="flex">
          <div className="mr-2">
            <strong htmlFor="stat_type">Loại:</strong>
            <select
              className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none"
              id="stat_type"
              value={statType}
              onChange={handleType}
              required
            >
              <option value="daily">Ngày</option>
              <option value="weekly">Tuần</option>
              <option value="monthly">Tháng</option>
              <option value="yearly">Năm</option>
            </select>
          </div>
          <div className="mr-2">
            <strong htmlFor="date">Chọn ngày:</strong>
            <input
              className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border border-dark rounded mt-2 flex h-9 w-full items-center justify-center rounded-xl border p-2 text-sm outline-none"
              type={statType === 'daily' ? 'date' : (statType === 'weekly' ? 'week' : 'month')}
              id="date"
              value={date}
              onChange={handleAction}
              required
            />
          </div>


          {/* <button type="submit">Calculate Profit</button> */}
        </div>

      </div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      {/* Conditionally render widgets only if totals have been fetched */}
      {totals && totals.total_revenue_profit && (
        <>
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Doanh thu"}
            subtitle={(totals.total_revenue_profit.total_revenue || 0)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          />
          <Widget
            icon={<IoDocuments className="h-6 w-6" />}
            title={"Lợi nhuận"}
            subtitle={(totals.total_revenue_profit.total_revenue - totals.total_revenue_profit.total_profit)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Tổng chi tiêu"}
            subtitle={(totals.total_expenditure_qty.total_expenditure)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 0}
          />
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={"Tổng đơn hàng"}
            subtitle={totals.total_order}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Tổng sản phẩm nhập"}
            subtitle={totals.total_expenditure_qty.total_qty || 0}
          />
          <Widget
            icon={<IoMdHome className="h-6 w-6" />}
            title={"Thành viên mới"}
            subtitle={totals.total_user || 0}
          />
        </>
      )}
      {/* Optionally add a loading indicator while fetching data */}
    </div>
      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="md:col-span-3">
          <TotalSpent dataTotalSpent={dataTotalSpent} reLoad={date}/>
        </div>
        <div className="md:col-span-1">
          <PieChartCard dataPieChartCard={dataPieChartCard}/>
        </div>
      </div>

      {/* Tables & Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">


        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>



        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;

import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const data = {
  labels: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
  datasets: [
    {
      label: "Năm 2019",
      data: [500000000, 520000000, 420000000, 520000000],
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0",
    },
    {
      label: "Năm 2020",
      data: [520000000, 500000000, 400000000, 550000000],
      backgroundColor: "rgb(54, 162, 235)",
      stack: "Stack 2",
    },
    {
      label: "Năm 2021",
      data: [550000000, 570000000, 380000000, 600000000],
      backgroundColor: "rgb(75, 192, 192)",
      stack: "Stack 1",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function ChartDemo(props) {
  const state = {
    labels: ["Năm 2019", "2020", "2021"],
    datasets: [
      {
        label: "Doanh thu",
        backgroundColor: "#0000ff",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [520000000, 520000000, 390000000],
      },
    ],
  };
  const statePie2019 = {
    labels: ["Nguyên liệu", "Thủ công mỹ nghệ", "Nông sản"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#000080", "#800000", "#00b300"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: [20, 30, 50],
      },
    ],
  };
  const statePie2020 = {
    labels: ["Nguyên liệu", "Thủ công mỹ nghệ", "Nông sản"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#000080", "#800000", "#00b300"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: [30, 30, 40],
      },
    ],
  };
  const statePie2021 = {
    labels: ["Nguyên liệu", "Thủ công mỹ nghệ", "Nông sản"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#000080", "#800000", "#00b300"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
        data: [20, 20, 60],
      },
    ],
  };
  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="px-5">
              <Bar data={data} options={options} />
              <h6 className="text-center font-italic">
                Biểu đồ doanh thu theo quý
              </h6>
            </div>
          </div>
          <div className="col-md-6">
            <div className="px-5">
              <Bar
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
              <h6 className="text-center font-italic">
                Biểu đồ doanh thu theo năm
              </h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="px-5 py-3">
              <Pie
                data={statePie2019}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
            </div>
            <h6 className="text-center font-italic">
              Biểu đồ sản lượng năm 2019
            </h6>
          </div>
          <div className="col-md-4">
            <div className="px-5 py-3">
              <Pie
                data={statePie2020}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
            </div>
            <h6 className="text-center font-italic">
              Biểu đồ sản lượng năm 2020
            </h6>
          </div>
          <div className="col-md-4">
            <div className="px-5 py-3">
              <Pie
                data={statePie2021}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
            </div>
            <h6 className="text-center font-italic">
              Biểu đồ sản lượng năm 2021
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChartDemo;

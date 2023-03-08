import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export default function BarChart({ title, data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        barThickness: 6,
        layout: {
            padding: 20,
        },
        plugins: {
            datalabels: {
                formatter: (value) => value + "\n",
                anchor: "end",
                font: {
                    lineHeight: 2,
                },
            },
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: title,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="h-[350px] w-[530px] p-4 4xl:w-[400px] 2xl:w-[300px]">
            <h1 className="font-medium">{title}</h1>

            <Bar options={options} data={{
                labels,
                datasets: [{
                    data: data,
                    backgroundColor: "#E59659",
                },
                ]
            }} />
        </div>
    );
}

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

export const data = {
    labels,
    datasets: [
        {
            label: "Test",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 12 })),
            backgroundColor: "#E59659",
        },
    ],
};

export default function BarChart({ title }) {
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
            <h1 className="font-medim">{title}</h1>

            <Bar options={options} data={data} />
        </div>
    );
}

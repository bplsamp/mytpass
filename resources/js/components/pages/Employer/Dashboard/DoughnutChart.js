import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ empCount, max }) {
    const doughData = {
        labels: ["Employees", "Free"],
        datasets: [
            {
                label: "",
                data: [empCount, max],

                backgroundColor: ["#E59659", "rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Doughnut data={doughData} options={{ cutout: 90, responsive: true }} />
    );
}

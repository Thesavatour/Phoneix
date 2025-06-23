'use client';
import useGlobalSettings from '@/hooks/useGlobalSettings';
import { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  series: {
    name: string;
    data: string[];
  }[];
  hegiht?: number;
  categories?: string[];
}

export default function Chart({ series, hegiht = 350, categories }: Props) {
  const { setTheme, resolvedTheme } = useTheme();
  const { data: globalSettings } = useGlobalSettings();

  const options: ApexOptions = {
    chart: {
      height: '100%',
      width: '100%',
      type: 'area',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    noData: {
      text: 'No data Available',
      align: 'center',
      verticalAlign: 'middle',
    },
    colors: ['#DFFF45', '#65C9DF', '#9C27B0'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: resolvedTheme === 'dark' ? '#fff' : '#000',
      },
      fontSize: '12px',
    },
    xaxis: {
      categories: categories,
      tickAmount: 30,
      tickPlacement: 'on',
      labels: {
        show: true,
        rotate: -45,
        minHeight: 20,
        hideOverlappingLabels: false,
        style: {
          fontSize: '12px',
          fontWeight: 500,
          colors: resolvedTheme === 'dark' ? '#fff' : '#000',
        },
      },

      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
          colors: resolvedTheme === 'dark' ? '#fff' : '#000',
        },
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
      theme: 'dark',
      y: {
        formatter: function (val) {
          return `${globalSettings?.currency_symbol}${val.toFixed(2)}`;
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options as ApexOptions}
        series={series as any}
        type="area"
        height={hegiht}
      />
    </div>
  );
}

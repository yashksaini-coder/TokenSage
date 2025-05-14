'use client'

import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const colors = [
  "#F44336", "#673AB7", "#03A9F4", "#4CAF50", "#FFEB3B", "#FF5722", "#607D8B", "#E91E63",
  "#3F51B5", "#00BCD4", "#8BC34A", "#FFC107", "#795548", "#9C27B0", "#2196F3", "#009688"
];

const transformForRecharts = (rawData: any[]) => {
  const transformedData = rawData.reduce((acc, curr) => {
    const singleTokenTimeSeries = curr.holdings.map((holdingsItem: any) => {
      const dateStr = holdingsItem.timestamp.slice(0, 10);
      const date = new Date(dateStr);
      const options = { day: "numeric", month: "short" } as const;
      const formattedDate = date.toLocaleDateString("en-US", options);
      return {
        timestamp: formattedDate,
        [curr.contract_ticker_symbol]: holdingsItem.close.quote
      }
    });
    const newArr = singleTokenTimeSeries.map((item: any, i: number) => Object.assign(item, acc[i]));
    return newArr;
  }, []);
  return transformedData;
};

export default function Explore() {
  const [data, setData] = useState<any[] | null>(null);
  const [keys, setKeys] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(res => {
        const rawData = res.data;
        const transformedData = transformForRecharts(rawData);
        const dataKeys = rawData.map((item: any) => item.contract_ticker_symbol);
        setKeys(dataKeys);
        setData(transformedData);
        setLoading(false);
      });
  }, []);

  if (loading || !data || !keys) return <div>Loading...</div>;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#18181b',
      padding: '2rem'
    }}>
      <h1 style={{ color: '#fff', marginBottom: '2rem', fontSize: '2rem', fontWeight: 600 }}>
        30-Day Historical Portfolio Chart
      </h1>
      <div style={{ background: '#23232b', borderRadius: 16, padding: 24, boxShadow: '0 4px 24px #0002', maxWidth: 1000, width: '100%' }}>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Tooltip />
            <Legend />
            {keys.map((item, i) => (
              <Line
                key={item}
                dataKey={item}
                type="monotone"
                stroke={colors[i % colors.length]}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

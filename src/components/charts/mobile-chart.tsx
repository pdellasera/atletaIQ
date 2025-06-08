"use client"

import { useRef, useEffect } from "react"
import * as echarts from "echarts"

interface MobileChartProps {
  type: "bar" | "pie" | "line"
  data: any[]
  height?: number
  options?: any
}

export function MobileChart({ type, data, height = 200, options = {} }: MobileChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      let defaultOption = {}

      switch (type) {
        case "bar":
          defaultOption = {
            grid: {
              left: "10%",
              right: "10%",
              top: "10%",
              bottom: "15%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: data.map((item) => item.name || item.year),
              axisLabel: { fontSize: 10 },
            },
            yAxis: {
              type: "value",
              axisLabel: { fontSize: 10 },
            },
            series: [
              {
                type: "bar",
                data: data.map((item) => item.value || item.oro),
                itemStyle: { color: "#ea580c" },
                barWidth: "60%",
              },
            ],
            tooltip: {
              trigger: "axis",
              textStyle: { fontSize: 12 },
            },
          }
          break

        case "pie":
          defaultOption = {
            series: [
              {
                type: "pie",
                radius: ["30%", "70%"],
                center: ["50%", "50%"],
                data: data,
                label: {
                  fontSize: 10,
                  formatter: "{b}\n{d}%",
                },
                labelLine: {
                  length: 10,
                  length2: 5,
                },
              },
            ],
            tooltip: {
              trigger: "item",
              textStyle: { fontSize: 12 },
            },
          }
          break

        case "line":
          defaultOption = {
            grid: {
              left: "10%",
              right: "10%",
              top: "10%",
              bottom: "15%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: data.map((item) => item.name || item.month),
              axisLabel: { fontSize: 10 },
            },
            yAxis: {
              type: "value",
              axisLabel: { fontSize: 10 },
            },
            series: [
              {
                type: "line",
                data: data.map((item) => item.value || item.score),
                itemStyle: { color: "#10b981" },
                lineStyle: { width: 2 },
                symbol: "circle",
                symbolSize: 6,
              },
            ],
            tooltip: {
              trigger: "axis",
              textStyle: { fontSize: 12 },
            },
          }
          break
      }

      const finalOption = { ...defaultOption, ...options }
      chart.setOption(finalOption)

      const handleResize = () => chart.resize()
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        chart.dispose()
      }
    }
  }, [type, data, options])

  return <div ref={chartRef} style={{ width: "100%", height: `${height}px` }} />
}
